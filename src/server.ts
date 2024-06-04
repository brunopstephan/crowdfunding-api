import fastify from 'fastify'
import { ZodError } from 'zod'
import { receiverController } from './core'
import { RouteRegisterOptions } from './types'
import { postgres } from './utils'

const app = fastify({
  logger: true,
})

async function main() {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        message: 'Validation error',
        errors: JSON.parse(error.message),
      })
    }

    reply.status(error.statusCode).send(error)
  })

  app.register(receiverController, {
    prefix: '/receiver',
    db: postgres,
  } as RouteRegisterOptions)

  try {
    await app.listen({ port: 9000 }).then(() => {
      console.log('Server is running on port 9000...')
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()
