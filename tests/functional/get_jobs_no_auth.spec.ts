import { test } from '@japa/runner'

test('get jobs error no auth', async ({ client }) => {
  const response = await client.get('/v1/jobs')

  response.assertStatus(401)
  response.assertBodyContains({
    status: "false",
    message: "E_UNAUTHORIZED_ACCESS: Unauthorized access",
    error: {
      responseText: "E_UNAUTHORIZED_ACCESS: Unauthorized access",
      guard: "jwt"
    },
    data: null
  })

})
