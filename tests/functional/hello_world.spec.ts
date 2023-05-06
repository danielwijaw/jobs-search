import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({
    status: "true",
    message: "Hello World",
    error: null,
    data: null
  })

})
