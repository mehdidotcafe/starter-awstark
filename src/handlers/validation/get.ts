import middy from '@middy/core'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import internalError from '../../response/internalError'
import success from '../../response/success'
import validationHttpMiddleware, { ValidatedEvent } from '../../validation/httpMiddleware'

const validator = z.object({
  queryStringParameters: z.object({
    name: z.string().min(3).max(255),
    carry: z.coerce.number().positive(),
  }),
})

const handler = async (event: ValidatedEvent<typeof validator>): Promise<APIGatewayProxyResult> => {
  try {
    return success({
      message: 'Validated successfully',
      data: event.queryStringParameters,
    })
  } catch (err) {
    return internalError()
  }
}

export default middy()
  .use(validationHttpMiddleware(validator))
  .handler(handler)
