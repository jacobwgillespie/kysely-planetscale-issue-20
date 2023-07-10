import { promises as fs } from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { Migrator, FileMigrationProvider, NO_MIGRATIONS } from 'kysely'
import { getConfig } from '../src/config/config.js'
import { getDBClient } from '../src/config/database.js'

const __filename = fileURLToPath(import.meta.url)

const config = getConfig()
const db = getDBClient(config.database)

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(path.dirname(__filename), '../migrations'),
  })
})

async function migrateToLatest() {
  const { error, results } = await migrator.migrateToLatest()
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration '${it.migrationName}' was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

async function migrateNone() {
  const { error, results } = await migrator.migrateTo(NO_MIGRATIONS)
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration '${it.migrationName}' was reverted successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

const myArgs = process.argv[2]

if (myArgs === 'latest') {
  await migrateToLatest()
} else if (myArgs === 'none') {
  await migrateNone()
}
