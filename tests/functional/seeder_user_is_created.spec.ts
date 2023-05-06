import { test } from '@japa/runner'

test('test login', async ({ client }) => {
  const response = await client.get('/v1/users')

  response.assertStatus(200)
  response.assertBodyContains({
    status: "false",
    message: "Users are created",
    data: null,
    error: null
  })

})
