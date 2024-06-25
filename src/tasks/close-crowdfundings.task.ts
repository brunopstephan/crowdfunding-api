import { Crowdfunding } from '@/schemas'
import { Postgres } from '@/utils'
import cron from 'node-cron'

export function closeCrowdfundingsTask(db: Postgres) {
  cron.schedule('0 0 4 * * MON', async () => {
    const { rows: crowdFundingsToClose } = await db.query<Crowdfunding>(
      'SELECT * FROM crowdfunding WHERE expire_at < NOW() AND closed = $1',
      [0],
    )

    if (!crowdFundingsToClose.length) return
  })
}
