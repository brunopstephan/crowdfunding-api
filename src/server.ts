import fastify from 'fastify'
import { ZodError } from 'zod'
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'
import { CrowdfundingController, ReceiverController } from './core'
import { DepositController } from './core/deposit'
import { RouteRegisterOptions } from './types'
import { postgres } from './utils'

const app = fastify({
  logger: true,
})

const swaggerOptions = {
  swagger: {
    info: {
      title: 'Crowdfunding API',
      description: 'A Crowdfunding API.',
      version: '1.0.0',
    },
    /*     host: 'localhost',
    schemes: ['http'], */
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'receiver', description: 'receiver routes' },
      { name: 'crowdfunding', description: 'crowdfunding routes' },
    ],
  },
}

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
}

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

  app.register(FastifySwagger, swaggerOptions)
  app.register(FastifySwaggerUI, swaggerUiOptions)

  app.register(ReceiverController, {
    prefix: '/receiver',
    db: postgres,
    docBaseOptions: {
      schema: {
        tags: ['receiver'],
      },
    },
  } as RouteRegisterOptions)
  app.register(CrowdfundingController, {
    prefix: '/crowdfunding',
    db: postgres,
    docBaseOptions: {
      schema: {
        tags: ['crowdfunding'],
      },
    },
  } as RouteRegisterOptions)
  app.register(DepositController, {
    prefix: '/deposit',
    db: postgres,
    docBaseOptions: {
      schema: {
        tags: ['deposit'],
      },
    },
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
