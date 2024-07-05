import {
  BadRequestExeption,
  InternalServerErrorException,
  NotFoundException,
} from '@/errors'
import { Crowdfunding, Receiver } from '@/schemas'
import { Postgres, queryGenerator } from '@/utils'
import {
  CrowdfundingCreateDto,
  CrowdfundingUpdateDto,
} from './crowdfunding.dto'

export class CrowdfundingRepository {
  constructor(private readonly db: Postgres) {}

  async findMany() {
    const data = await this.db.query<Crowdfunding[]>(
      'SELECT * FROM crowdfunding',
    )

    return data
  }

  async findOne(id: string) {
    const data = await this.db.query<Crowdfunding>(
      'SELECT * FROM crowdfunding WHERE id = $1',
      [id],
    )

    if (data.rows.length === 0)
      throw new NotFoundException('Crowdfunding not found')

    return data
  }

  async create(data: CrowdfundingCreateDto) {
    const { rows } = await this.db.query<Receiver>(
      'SELECT crowdfundings_limit FROM receiver WHERE id = $1',
      [data.receiver_id],
    )

    if (rows.length === 0) throw new NotFoundException('Receiver not found')

    const receiverLimit = rows[0].crowdfundings_limit

    if (receiverLimit === 0)
      throw new BadRequestExeption(
        'Receiver has reached the limit of crowdfundings (5)',
      )

    const { dataArr, fields, values } = queryGenerator(data)

    return await this.db
      .query<Crowdfunding>(
        `INSERT INTO crowdfunding (${fields}) VALUES (${values}) RETURNING *`,
        dataArr,
      )
      .catch((_) => {
        throw new InternalServerErrorException('Error creating crowdfunding')
      })
  }

  async update({ id, description, goal, title }: CrowdfundingUpdateDto) {
    const filtered = Object.entries({ description, goal, title }).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value
        return acc
      },
      {},
    )

    const sets = Object.entries(filtered).map(
      ([key, value]) =>
        `${key} = ${typeof value === 'string' ? `'${value}'` : value}`,
    )

    if (!sets.length) return null

    return await this.db
      .query<Crowdfunding>(
        `UPDATE crowdfunding SET ${sets.join(', ')} WHERE id = $1 RETURNING *`,
        [id],
      )
      .catch((_) => {
        throw new InternalServerErrorException('Error updating crowdfunding')
      })
  }

  async delete(id: string) {
    return await this.db.query<Crowdfunding>(
      'DELETE FROM crowdfunding WHERE id = $1 RETURNING *',
      [id],
    )
  }
}
