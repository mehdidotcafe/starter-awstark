import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { PrismaClient } from '@prisma/client'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import notFound from '../../response/notFound'
import serviceUnavailable from '../../response/serviceUnavailable'
import success from '../../response/success'
import validationHttpMiddleware, {
  ValidatedEvent,
} from '../../validation/httpMiddleware'

const prisma = new PrismaClient()

const validator = z.object({
  queryStringParameters: z.object({
    email: z.string().email(),
  }),
})

const handler = async (
  event: ValidatedEvent<typeof validator>,
): Promise<APIGatewayProxyResult> => {
  const payload = event.queryStringParameters

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
      },
    })

    if (!foundUser) {
      return notFound({
        message: 'User not found',
      })
    }

    return success({
      message: 'User found',
      data: foundUser,
    })
  } catch (err) {
    return serviceUnavailable({
      message: 'Service unavailable',
      data: {
        code: err.code,
        error: err.message,
      },
    })
  }
}

export default middy()
  .use(httpJsonBodyParser())
  .use(validationHttpMiddleware(validator))
  .handler(handler)
