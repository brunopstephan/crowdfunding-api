import { Postgres } from '@/utils'
import cron from 'node-cron'

export function closeCrowdfundingsTask(db: Postgres) {
  //every monday as 4am
  cron.schedule('0 0 4 * * MON', async () => {
    await db.query(
      'UPDATE crowdfundings SET closed = 1 WHERE expire_at IS NOT NULL AND expire_at <= CURRENT_DATE',
    )

    return 'ok'
  })
}
