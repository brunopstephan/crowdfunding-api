import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { CrowdfundingRepository } from './common'
import { CrowdfundingService } from './crowdfunding.service'

export function CrowdfundingController(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const crowdfundingRepository = new CrowdfundingRepository(opts.db)

  const crowdfundingService = new CrowdfundingService(crowdfundingRepository)

  fastify.get('/', opts.docBaseOptions, async (request, reply) => {
    return await crowdfundingService.getCrowdfunding(request, reply)
  })

  fastify.get('/:id', opts.docBaseOptions, async (request, reply) => {
    return await crowdfundingService.getCrowdfundingById(request, reply)
  })

  fastify.post('/', opts.docBaseOptions, async (request, reply) => {
    return await crowdfundingService.createCrowdfunding(request, reply)
  })

  fastify.put('/', opts.docBaseOptions, async (request, reply) => {
    return await crowdfundingService.updateCrowdfunding(request, reply)
  })

  fastify.delete('/:id', opts.docBaseOptions, async (request, reply) => {
    return await crowdfundingService.deleteCrowdfunding(request, reply)
  })

  done()
}
