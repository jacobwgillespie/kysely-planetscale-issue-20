import { connect } from '@planetscale/database'
import { getConfig } from './config/config'

export const reproduce = async (
  name: string,
  email: string,
  providerType: string,
  providerUserId: string
) => {
  const config = getConfig()
  const conn = connect(config.database)
  try {
    await conn.transaction(async (trx) => {
      const userId = await trx.execute(
        'insert into `user` (`name`, `email`, `is_email_verified`, `password`, `role`) values (?, ?, ?, ?, ?)',
        [name, email, true, null, 'user']
      )
      await trx.execute(
        'insert into `authorisations` (`user_id`, `provider_type`, `provider_user_id`) values (?, ?, ?)',
        [Number(userId.insertId), providerType, providerUserId]
      )
      return userId
    })
  } catch (error) {
    await conn.execute('delete from `user` where `user`.`email` = ?', [email])
    throw new Error('User already exists!')
  }
}
