import { Generated, Selectable } from 'kysely'
import { BaseModel } from './base.model'

export interface UserTable {
  id: Generated<number>
  name: string
  email: string
}

export class User extends BaseModel implements Selectable<UserTable> {
  id: number
  name: string
  email: string

  private_fields = []

  constructor(user: Selectable<UserTable>) {
    super()
    this.id = user.id
    this.name = user.name
    this.email = user.email
  }
}
