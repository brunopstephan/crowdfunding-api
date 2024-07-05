import { Crowdfunding } from '@/schemas'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  CrowdfundingRepository,
  crowdfundingCreateDtoSchema,
  crowdfundingUpdateDtoSchema,
} from './common'

export class CrowdfundingService {
  constructor(private crowdfundingRepository: CrowdfundingRepository) {}

  async getCrowdfunding(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Crowdfunding[]> {
    const data = await this.crowdfundingRepository.findMany()
    return reply.status(200).send(data.rows)
  }

  async getCrowdfundingById(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Crowdfunding> {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    const data = await this.crowdfundingRepository.findOne(id)

    return reply.status(200).send(data.rows)
  }

  async createCrowdfunding(request: FastifyRequest, reply: FastifyReply) {
    const body = crowdfundingCreateDtoSchema.parse(request.body)

    const data = await this.crowdfundingRepository.create(body)

    return reply.status(201).send(data.rows)
  }

  async updateCrowdfunding(request: FastifyRequest, reply: FastifyReply) {
    const body = crowdfundingUpdateDtoSchema.parse(request.body)

    const data = await this.crowdfundingRepository.update(body)

    if (data === null)
      return reply.status(400).send({ message: 'Nothing to update, aborting.' })

    if (data.rows.length === 0)
      return reply
        .status(404)
        .send({ message: 'Crowdfunding not found to update' })

    return reply.status(200).send(data.rows)
  }

  async deleteCrowdfunding(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    if (!id) {
      return reply
        .status(400)
        .send({ message: 'id is required in route params' })
    }

    const data = await this.crowdfundingRepository.delete(id)

    if (data.rows.length === 0)
      return reply
        .status(404)
        .send({ message: 'Crowdfunding not found to delete' })

    return reply.status(200).send(data.rows)
  }
}
