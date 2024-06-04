import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { ReceiverRepository } from './common'
import { ReceiverService } from './receiver.service'

export function receiverController(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const repository = new ReceiverRepository(opts.db)
  const {
    getReceiver,
    getReceiverById,
    createReceiver,
    updateReceiver,
    deleteReceiver,
  } = new ReceiverService(repository)

  fastify.get('/', getReceiver)

  fastify.get('/:id', getReceiverById)

  fastify.post('/', createReceiver)

  fastify.put('/', updateReceiver)

  fastify.delete('/:id', deleteReceiver)

  done()
}
