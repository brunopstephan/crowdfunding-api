export const config = {
  db: {
    pwd: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    name: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}
