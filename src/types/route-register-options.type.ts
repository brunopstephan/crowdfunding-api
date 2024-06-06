import { Postgres } from '@/utils'
export type RouteRegisterOptions = {
  prefix: string
  db?: Postgres
  docBaseOptions: {
    schema: {
      tags: string[]
    }
  }
}
