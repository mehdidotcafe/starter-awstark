import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import validationHttpMiddleware, { ValidatedEvent } from '../../common/validation/httpMiddleware'

const validator = z.object({
  body: z.object({
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
        body: event.body,
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
  .use(httpJsonBodyParser())
  .use(validationHttpMiddleware(validator))
  .handler(handler)
