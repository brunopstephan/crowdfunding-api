import { Pool } from 'pg'

export type RouteRegisterOptions = {
  prefix: string
  db?: Pool
}
