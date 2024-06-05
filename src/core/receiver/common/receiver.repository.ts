import { Receiver } from '@/schemas'
import { Postgres } from '@/utils'
import { ReceiverCreateDto, ReceiverUpdateDto } from './receiver.dto'

export class ReceiverRepository {
  constructor(private readonly db: Postgres) {}

  async findMany() {
    const data = await this.db.query<Receiver[]>('SELECT * FROM receiver')

    return data
  }

  async findOne(id: string) {
    const data = await this.db.query<Receiver>(
      'SELECT * FROM receiver WHERE id = $1',
      [id],
    )

    return data
  }

  async create({ name }: ReceiverCreateDto) {
    return await this.db.query<Receiver>(
      'INSERT INTO receiver (name) VALUES ($1) RETURNING *',
      [name],
    )
  }

  async update({ id, name }: ReceiverUpdateDto) {
    return await this.db.query<Receiver>(
      'UPDATE receiver SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
    )
  }

  async delete(id: string) {
    return await this.db.query<Receiver>(
      'DELETE FROM receiver WHERE id = $1 RETURNING *',
      [id],
    )
  }
}
