import { APIGatewayProxyResult } from 'aws-lambda'

import handler from '../../src/handlers/status'

describe('Unit test for app handler', () => {
  it('verifies successful response', async () => {
    const result: APIGatewayProxyResult = await handler()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(
      JSON.stringify({
        message: 'up',
      }),
    )
  })
})
