import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { ReceiverRepository } from './common'
import { ReceiverService } from './receiver.service'

export function ReceiverController(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const receiverRepository = new ReceiverRepository(opts.db)

  const receiverService = new ReceiverService(receiverRepository)

  fastify.get('/', opts.docBaseOptions, async (request, reply) => {
    return await receiverService.getReceiver(request, reply)
  })

  fastify.get('/:id', opts.docBaseOptions, async (request, reply) => {
    return await receiverService.getReceiverById(request, reply)
  })

  fastify.post(
    '/',
    {
      ...opts.docBaseOptions,
      schema: {
        ...opts.docBaseOptions.schema,
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      return await receiverService.createReceiver(request, reply)
    },
  )

  fastify.put(
    '/',
    {
      ...opts.docBaseOptions,
      schema: {
        ...opts.docBaseOptions.schema,
        body: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      return await receiverService.updateReceiver(request, reply)
    },
  )

  fastify.delete('/:id', opts.docBaseOptions, async (request, reply) => {
    return await receiverService.deleteReceiver(request, reply)
  })

  done()
}
