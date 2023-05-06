import { rules, schema } from '@ioc:Adonis/Core/Validator'

export function LoginSchema() {
  return schema.create({
    username: schema.string([
      rules.minLength(5)
    ]),
    password: schema.string([
      rules.minLength(5)]),
  })
}

export function RefreshSchema() {
  return schema.create({
    refresh_token: schema.string()
  })
}
