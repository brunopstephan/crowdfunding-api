import { Crowdfunding, Deposit } from '@/schemas'
import { Postgres } from '@/utils'
import { DepositCreateDto } from './deposit.dto'

export class DepositRepository {
  constructor(private readonly db: Postgres) {}

  async findMany() {
    const data = await this.db.query<Deposit[]>('SELECT * FROM deposit')

    return data
  }

  async findOne(id: string) {
    const data = await this.db.query<Deposit>(
      'SELECT * FROM deposit WHERE id = $1',
      [id],
    )

    return data
  }

  async create({ amount, crowdfunding_id, payer }: DepositCreateDto) {
    const {
      rows: [{ closed: isCrowdfundingClosed }],
    } = await this.db.query<Crowdfunding>(
      'SELECT closed FROM crowdfunding WHERE id = $1',
      [crowdfunding_id],
    )

    if (isCrowdfundingClosed) throw new Error('Crowdfunding is closed')

    return await this.db.query<Deposit>(
      'INSERT INTO deposit (amount, crowdfunding_id, payer) VALUES ($1, $2, $3) RETURNING *',
      [amount, crowdfunding_id, payer],
    )
  }

  async delete(id: string) {
    return await this.db.query<Deposit>(
      'DELETE FROM deposit WHERE id = $1 RETURNING *',
      [id],
    )
  }
}
