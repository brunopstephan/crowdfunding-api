import { RouteRegisterOptions } from '@/types'
import { FastifyInstance } from 'fastify'
import { AuthService } from './auth.service'
import { AuthRepository } from './common'

export function authRoutes(
  fastify: FastifyInstance,
  opts: RouteRegisterOptions,
  done: any,
) {
  const authRepository = new AuthRepository(opts.db)
  const authService = new AuthService(authRepository)

  fastify.post(
    '/register',
    {
      ...opts.docBaseOptions,
      schema: {
        ...opts.docBaseOptions.schema,
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      return await authService.register(request, reply)
    },
  )

  fastify.post(
    '/signin',
    {
      ...opts.docBaseOptions,
      schema: {
        ...opts.docBaseOptions.schema,
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      return await authService.login(request, reply)
    },
  )
  done()
}
