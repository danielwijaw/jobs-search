import { test } from '@japa/runner'

test('display 404 page', async ({ client }) => {
  const response = await client.get('/test-page')

  response.assertStatus(404)
  response.assertBodyContains({
    status: "false",
    message: "E_ROUTE_NOT_FOUND: Cannot GET:/test-page",
    error: {
      body: "E_ROUTE_NOT_FOUND: Cannot GET:/test-page"
    },
    data: null
  })

})
