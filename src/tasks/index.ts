import { Postgres } from '@/utils'
import { closeCrowdfundingsTask } from './close-crowdfundings.task'

export function registerCrons(db: Postgres) {
  closeCrowdfundingsTask(db)
}
