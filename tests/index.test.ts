import { faker } from '@faker-js/faker'
import { TableReference } from 'kysely/dist/cjs/parser/table-parser'
import { reproduce } from '../src'
import { getConfig } from '../src/config/config'
import { Database } from '../src/config/database'
import { insertUsers, userOne } from './fixtures/user.fixture'
import { clearDBTables } from './utils/clearDBTables'

const config = getConfig()

clearDBTables([
  'user' as TableReference<Database>,
  'authorisations' as TableReference<Database>
], config.database)

describe('Reproduce tests', () => {
  test('should not timeout due to locking issues', async () => {
    await insertUsers([userOne], config.database)
    expect(
      await reproduce(userOne.name, userOne.email, 'google', faker.datatype.uuid())
    ).toThrow('User already exists!')
  })
})
