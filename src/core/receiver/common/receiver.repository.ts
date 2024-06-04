import { Pool } from 'pg'

export class ReceiverRepository {
  constructor(private readonly postgres: Pool) {}

  async getReceiver() {
    return { hello: 'world' }
  }

  async getReceiverById() {}

  async createReceiver() {}

  async updateReceiver() {}

  async deleteReceiver() {}
}
