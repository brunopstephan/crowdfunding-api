import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { DepositRepository } from './common'
import { DepositService } from './deposit.service'

export function depositRoutes(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const depositRepository = new DepositRepository(opts.db)

  const depositService = new DepositService(depositRepository)

  fastify.get('/', opts.docBaseOptions, async (request, reply) => {
    return await depositService.getDeposit(request, reply)
  })

  fastify.get('/:id', opts.docBaseOptions, async (request, reply) => {
    return await depositService.getDepositById(request, reply)
  })

  fastify.post(
    '/',
    {
      ...opts.docBaseOptions,
      schema: {
        ...opts.docBaseOptions.schema,
        body: {
          type: 'object',
          required: ['crowdfunding_id', 'amount'],
          properties: {
            crowdfunding_id: { type: 'string' },
            payer: { type: 'string', default: null, nullable: true },
            amount: { type: 'number' },
          },
        },
      },
    },
    async (request, reply) => {
      return await depositService.createDeposit(request, reply)
    },
  )

  fastify.delete('/:id', opts.docBaseOptions, async (request, reply) => {
    return await depositService.deleteDeposit(request, reply)
  })

  done()
}
