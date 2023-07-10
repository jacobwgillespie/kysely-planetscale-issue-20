import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { UserTable } from '../models/user.model'
import { Config } from './config'

let dbClient: Kysely<Database>

export interface Database {
  user: UserTable
}

export const getDBClient = (databaseConfig: Config['database']) => {
  dbClient =
    dbClient ||
    new Kysely<Database>({
      dialect: new PlanetScaleDialect({
        username: databaseConfig.username,
        password: databaseConfig.password,
        host: databaseConfig.host
      })
    })
  return dbClient
}
