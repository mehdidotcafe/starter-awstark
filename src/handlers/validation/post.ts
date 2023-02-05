import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import internalError from '../../response/internalError'
import success from '../../response/success'
import validationHttpMiddleware, { ValidatedEvent } from '../../validation/httpMiddleware'

const validator = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    carry: z.coerce.number().positive(),
  }),
})

const handler = async (event: ValidatedEvent<typeof validator>): Promise<APIGatewayProxyResult> => {
  try {
    return success({
      message: 'Validated successfully',
      data: event.body,
    })
  } catch (err) {
    return internalError({
      message: 'some error happened',
    })
  }
}

export default middy()
  .use(httpJsonBodyParser())
  .use(validationHttpMiddleware(validator))
  .handler(handler)
