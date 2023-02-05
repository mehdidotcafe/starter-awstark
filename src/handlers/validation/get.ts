import middy from '@middy/core'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import validationHttpMiddleware, { ValidatedEvent } from '../../common/validation/httpMiddleware'

const validator = z.object({
  queryStringParameters: z.object({
    name: z.string().min(3).max(255),
    carry: z.coerce.number().positive(),
  }),
})

const handler = async (event: ValidatedEvent<typeof validator>): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Validated successfully',
        queryStringParameters: event.queryStringParameters,
      }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    }
  }
}

export default middy()
  .use(validationHttpMiddleware(validator))
  .handler(handler)
