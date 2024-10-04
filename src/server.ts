import 'dotenv/config'
import fastify from 'fastify'
import { ZodError } from 'zod'
import formbody from '@fastify/formbody'
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'
import { config } from './config'
import {
  crowdfundingRoutes,
  depositRoutes,
  receiverRoutes,
  authRoutes,
} from './core'
import { tokenValidation } from './middlewares'
import { registerCrons } from './tasks'
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
      { name: 'auth', description: 'auth routes' },
      { name: 'receiver', description: 'receiver routes' },
      { name: 'crowdfunding', description: 'crowdfunding routes' },
      { name: 'deposit', description: 'deposit routes' },
    ],
  },
}

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
}

async function main() {
  app.register(formbody)
  //register custom error handler for validation errors
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        message: 'Validation error',
        errors: JSON.parse(error.message),
      })
    }

    reply.status(error.statusCode).send(error)
  })

  //register swagger config
  app.register(FastifySwagger, swaggerOptions)
  app.register(FastifySwaggerUI, swaggerUiOptions)

  //register server routes
  app.register(authRoutes, {
    prefix: '/auth',
    db: postgres,
    docBaseOptions: {
      schema: {
        tags: ['auth'],
      },
    },
  } as RouteRegisterOptions)

  app.register((instance, _, done) => {
    if (config.env === 'production')
      instance.addHook('preHandler', tokenValidation)
    instance.register(receiverRoutes, {
      prefix: '/receiver',
      db: postgres,
      docBaseOptions: {
        schema: {
          tags: ['receiver'],
        },
      },
    } as RouteRegisterOptions)

    instance.register(crowdfundingRoutes, {
      prefix: '/crowdfunding',
      db: postgres,
      docBaseOptions: {
        schema: {
          tags: ['crowdfunding'],
        },
      },
    } as RouteRegisterOptions)

    instance.register(depositRoutes, {
      prefix: '/deposit',
      db: postgres,
      docBaseOptions: {
        schema: {
          tags: ['deposit'],
        },
      },
    } as RouteRegisterOptions)

    done()
  })

  //registering cron jobs
  registerCrons(postgres)

  try {
    await app.listen({ port: 9000, host: '0.0.0.0' }).then(() => {
      console.log('Server is running on port 9000...')
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()
