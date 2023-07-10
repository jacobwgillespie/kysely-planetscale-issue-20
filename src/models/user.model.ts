import { Generated, Selectable } from 'kysely'
import { BaseModel } from './base.model'

export interface UserTable {
  id: Generated<number>
  name: string
  email: string
  password: string | null  // null if user is created via OAuth
  is_email_verified: boolean
  role: string,
  stripe_customer_id: string | null
}

export class User extends BaseModel implements Selectable<UserTable> {
  id: number
  name: string
  email: string
  is_email_verified: boolean
  role: string
  password: string | null
  stripe_customer_id: string | null

  private_fields = ['password', 'stripe_customer_id']

  constructor(user: Selectable<UserTable>) {
    super()
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.is_email_verified = user.is_email_verified
    this.role = user.role
    this.password = user.password
    this.stripe_customer_id = user.stripe_customer_id
  }
}
