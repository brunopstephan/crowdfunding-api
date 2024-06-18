import { Deposit } from '@/schemas'
import { FastifyReply, FastifyRequest } from 'fastify'
import { DepositRepository, depositCreateDtoSchema } from './common'

export class DepositService {
  constructor(private depositRepository: DepositRepository) {}

  async getDeposit(_: FastifyRequest, reply: FastifyReply): Promise<Deposit[]> {
    try {
      const data = await this.depositRepository.findMany()
      return reply.status(200).send(data.rows)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  async getDepositById(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Deposit> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    try {
      const data = await this.depositRepository.findOne(id)
      if (data.rows.length === 0)
        return reply.status(404).send({ message: 'Deposit not found' })
      return reply.status(200).send(data.rows)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  async createDeposit(request: FastifyRequest, reply: FastifyReply) {
    const body = depositCreateDtoSchema.parse(request.body)

    try {
      const data = await this.depositRepository.create(body)

      return reply.status(201).send(data.rows)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }

  async deleteDeposit(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    try {
      const data = await this.depositRepository.delete(id)

      if (data.rows.length === 0)
        return reply
          .status(404)
          .send({ message: 'Deposit not found to delete' })

      return reply.status(200).send(data.rows)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal server error',
        error: error.message,
      })
    }
  }
}
