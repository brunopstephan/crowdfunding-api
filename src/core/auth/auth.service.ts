import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthRepository, loginUserSchema, registerUserSchema } from './common/'

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const data = registerUserSchema.parse(request.body)

    const user = await this.authRepository.register(data)

    return reply.code(201).send(user)
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginUserSchema.parse(request.body)

    const token = await this.authRepository.login(data)

    return reply.code(200).send(token)
  }
}
