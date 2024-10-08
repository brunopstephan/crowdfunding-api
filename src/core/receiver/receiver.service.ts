import { Receiver } from '@/schemas'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ReceiverRepository,
  receiverCreateDtoSchema,
  receiverUpdateDtoSchema,
} from './common'

export class ReceiverService {
  constructor(private receiverRepository: ReceiverRepository) {}

  async getReceiver(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Receiver[]> {
    const data = await this.receiverRepository.findMany()
    return reply.status(200).send(data.rows)
  }

  async getReceiverById(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Receiver> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    const data = await this.receiverRepository.findOne(id)
    if (data.rows.length === 0)
      return reply.status(404).send({ message: 'Receiver not found' })
    return reply.status(200).send(data.rows)
  }

  async createReceiver(request: FastifyRequest, reply: FastifyReply) {
    const body = receiverCreateDtoSchema.parse(request.body)

    const data = await this.receiverRepository.create(body)

    return reply.status(201).send(data.rows)
  }

  async updateReceiver(request: FastifyRequest, reply: FastifyReply) {
    const body = receiverUpdateDtoSchema.parse(request.body)

    const data = await this.receiverRepository.update(body)

    if (data.rows.length === 0)
      return reply.status(404).send({ message: 'Receiver not found to update' })

    return reply.status(200).send(data.rows)
  }

  async deleteReceiver(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    const data = await this.receiverRepository.delete(id)

    if (data.rows.length === 0)
      return reply.status(404).send({ message: 'Receiver not found to delete' })

    return reply.status(200).send(data.rows)
  }
}
