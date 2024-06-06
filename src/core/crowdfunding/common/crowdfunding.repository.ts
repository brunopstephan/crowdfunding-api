import { Crowdfunding } from '@/schemas'
import { Postgres } from '@/utils'
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

    return data
  }

  async create({
    title,
    description,
    goal,
    receiver_id,
  }: CrowdfundingCreateDto) {
    return await this.db.query<Crowdfunding>(
      'INSERT INTO crowdfunding (receiver_id, title, description, goal) VALUES ($1, $2, $3, $4) RETURNING *',
      [receiver_id, title, description, goal],
    )
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

    return await this.db.query<Crowdfunding>(
      `UPDATE crowdfunding SET ${sets.join(', ')} WHERE id = $1 RETURNING *`,
      [id],
    )
  }

  async delete(id: string) {
    return await this.db.query<Crowdfunding>(
      'DELETE FROM crowdfunding WHERE id = $1 RETURNING *',
      [id],
    )
  }
}
