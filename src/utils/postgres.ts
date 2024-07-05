import { config } from '@/config'
import { Pool } from 'pg'

export const postgres = new Pool({
  host: config.db.host,
  port: parseInt(config.db.port),
  user: String(config.db.user),
  password: String(config.db.pwd),
  database: config.db.name,
})

export type Postgres = typeof postgres
