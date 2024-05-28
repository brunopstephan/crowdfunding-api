import fastify from 'fastify'
import { postgres } from './utils'
import 'dotenv/config'

const app = fastify({ logger: true })

async function main() {
  console.log(await postgres.query('SELECT NOW()'))

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
