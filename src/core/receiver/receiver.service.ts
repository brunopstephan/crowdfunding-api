import { Receiver } from '@/schemas'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ReceiverRepository,
  receiverCreateDtoSchema,
  receiverUpdateDtoSchema,
} from './common'

export class ReceiverService {
  constructor(private readonly receiverRepository: ReceiverRepository) {}

  async getReceiver(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Receiver[]> {
    return reply.send([])
  }

  async getReceiverById(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Receiver> {
    const { id } = request.params as { id: number }

    return reply.send({ id })
  }

  async createReceiver(request: FastifyRequest, reply: FastifyReply) {
    const body = receiverCreateDtoSchema.parse(request.body)

    return reply.status(201).send(body)
  }

  async updateReceiver(request: FastifyRequest, reply: FastifyReply) {
    const body = receiverUpdateDtoSchema.parse(request.body)

    return reply.status(201).send(body)
  }

  async deleteReceiver(request: FastifyRequest, reply: FastifyReply) {
    //const { id } = request.params as { id: number }

    return reply.status(204).send()
  }
}
