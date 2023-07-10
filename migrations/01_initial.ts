import { Kysely, sql } from 'kysely'
import { Database } from '../src/config/database'

export async function up(db: Kysely<Database>) {
  // User table
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.defaultTo(null))
    .addColumn('email', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`))
    .addColumn('updated_at', 'timestamp', (col) => {
      return col.defaultTo(sql`NOW()`).modifyEnd(sql`ON UPDATE NOW()`)
    })
    .execute()

  await db.schema
    .createIndex('user_email_index')
    .on('user')
    .column('email')
    .execute()
}

export async function down(db: Kysely<Database>) {
  await db.schema.dropTable('user').execute()
}
