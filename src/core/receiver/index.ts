import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { ReceiverRepository } from './common'
import { ReceiverService } from './receiver.service'

export function receiverController(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const receiverRepository = new ReceiverRepository(opts.db)

  const receiverService = new ReceiverService(receiverRepository)

  fastify.get('/', async (request, reply) => {
    return await receiverService.getReceiver(request, reply)
  })

  fastify.get('/:id', async (request, reply) => {
    return await receiverService.getReceiverById(request, reply)
  })

  fastify.post('/', async (request, reply) => {
    return await receiverService.createReceiver(request, reply)
  })

  fastify.put('/', async (request, reply) => {
    return await receiverService.updateReceiver(request, reply)
  })

  fastify.delete('/:id', async (request, reply) => {
    return await receiverService.deleteReceiver(request, reply)
  })

  done()
}
