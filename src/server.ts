import fastify from 'fastify'
import { ZodError } from 'zod'
import { receiverRoutes } from './core'
import { RouteRegisterOptions } from './types'
import { postgres } from './utils'

/* function Logger(...args) {
  this.args = args
}
Logger.prototype.info = function (msg: string) {
  console.log('INFO', msg)
}
Logger.prototype.error = function (msg: string) {
  console.log('ERROR', msg)
}
Logger.prototype.debug = function (msg: string) {
  console.log('DEBUG', msg)
}
Logger.prototype.fatal = function (msg: string) {
  console.log('FATAL', msg)
}
Logger.prototype.warn = function (msg: string) {
  console.log('WARN', msg)
}
Logger.prototype.trace = function (msg: string) {
  console.log('TRACE', msg)
}
Logger.prototype.child = function () {
  return new Logger()
}
 */
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

  app.register(receiverRoutes, {
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
