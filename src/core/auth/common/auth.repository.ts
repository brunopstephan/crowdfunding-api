import { BadRequestExeption } from '@/errors'
import { Receiver } from '@/schemas'
import {
  Postgres,
  comparePassword,
  encryptPassword,
  generateToken,
} from '@/utils'
import { LoginUser, RegisterUser } from './auth.dto'

export class AuthRepository {
  constructor(private db: Postgres) {}

  async register(data: RegisterUser) {
    const isAlreadyRegistered = await this.db.query<Receiver>(
      'SELECT * FROM receiver WHERE email = $1',
      [data.email],
    )

    if (isAlreadyRegistered.rows.length > 0) {
      throw new BadRequestExeption('User with this email already exists')
    }

    const user = await this.db.query<Receiver>(
      'INSERT INTO receiver (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.email, encryptPassword(data.password)],
    )

    return user.rows[0]
  }

  async login(data: LoginUser) {
    const user = await this.db.query<Receiver>(
      'SELECT * FROM receiver WHERE email = $1',
      [data.email],
    )

    if (user.rows.length === 0) {
      throw new BadRequestExeption('User or password incorrect!')
    }

    const isPasswordMatch = comparePassword(
      data.password,
      user.rows[0].password,
    )

    if (!isPasswordMatch) {
      throw new BadRequestExeption('User or password incorrect!')
    }

    return {
      message: 'ok',
      token: generateToken(),
    }
  }
}
