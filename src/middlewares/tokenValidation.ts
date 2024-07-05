import { isTokenValid } from '@/utils'
import { FastifyReply, FastifyRequest } from 'fastify'

export function tokenValidation(
  request: FastifyRequest,
  reply: FastifyReply,
  done: any,
) {
  const { token } = request.headers
  if (!token) {
    reply.status(401).send({
      message: 'Token is required',
    })
  }

  const isValid = isTokenValid(token as string)

  if (!isValid)
    reply.status(403).send({
      message: 'Token is invalid or expired',
    })

  done()
}
