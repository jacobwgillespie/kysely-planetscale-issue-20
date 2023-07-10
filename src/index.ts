import { getConfig } from './config/config'
import { getDBClient } from './config/database'

export const reproduce = async (
  name: string,
  email: string,
  providerType: string,
  providerUserId: string
) => {
  const config = getConfig()
  const client = getDBClient(config.database)
  try {
    await client.transaction().execute(async (trx) => {
      const userId = await trx
        .insertInto('user')
        .values({
          name: name,
          email: email,
          is_email_verified: true,
          password: null,
          role: 'user'
        })
        .executeTakeFirstOrThrow()
      await trx
        .insertInto('authorisations')
        .values({
          user_id: Number(userId.insertId),
          provider_type: providerType,
          provider_user_id: providerUserId
        })
        .executeTakeFirstOrThrow()
      return userId
    })
  } catch (error) {
    await client.deleteFrom('user').where('user.email', '=', email).execute()
    throw new Error('User already exists!')
  }
}
