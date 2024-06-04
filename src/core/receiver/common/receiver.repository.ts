import { Postgres } from '@/utils'

export class ReceiverRepository {
  constructor(private readonly db: Postgres) {}

  async findMany() {
    return { hello: 'world' }
  }

  async findOne() {}

  async create() {}

  async update() {}

  async delete() {}
}
