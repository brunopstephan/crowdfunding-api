import fastify from 'fastify'

const app = fastify({ logger: true })

async function main() {
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
