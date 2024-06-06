import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { CrowdfundingRepository } from './common'
import { CrowdfundingService } from './crowdfunding.service'

export function crowdfundingController(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const crowdfundingRepository = new CrowdfundingRepository(opts.db)

  const crowdfundingService = new CrowdfundingService(crowdfundingRepository)

  fastify.get('/', async (request, reply) => {
    return await crowdfundingService.getCrowdfunding(request, reply)
  })

  fastify.get('/:id', async (request, reply) => {
    return await crowdfundingService.getCrowdfundingById(request, reply)
  })

  fastify.post('/', async (request, reply) => {
    return await crowdfundingService.createCrowdfunding(request, reply)
  })

  fastify.put('/', async (request, reply) => {
    return await crowdfundingService.updateCrowdfunding(request, reply)
  })

  fastify.delete('/:id', async (request, reply) => {
    return await crowdfundingService.deleteCrowdfunding(request, reply)
  })

  done()
}
