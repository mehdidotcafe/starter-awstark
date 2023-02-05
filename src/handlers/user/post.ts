import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { Prisma, PrismaClient } from '@prisma/client'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

import conflict from '../../response/conflict'
import serviceUnavailable from '../../response/serviceUnavailable'
import success from '../../response/success'
import validationHttpMiddleware, {
  ValidatedEvent,
} from '../../validation/httpMiddleware'

const prisma = new PrismaClient()

const validator = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(9).max(255),
    firstname: z.string().min(1).max(255),
  }),
})

const handler = async (
  event: ValidatedEvent<typeof validator>,
): Promise<APIGatewayProxyResult> => {
  const payload = event.body

  try {
    const createdUser = await prisma.user.create({
      data: payload,
    })
    return success({
      message: 'User created',
      data: createdUser,
    })
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError
      && err.code === 'P2002'
    ) {
      return conflict({
        message: 'A user with this email already exists',
      })
    }
  }

  return serviceUnavailable({
    message: 'Service unavailable',
  })
}

export default middy()
  .use(httpJsonBodyParser())
  .use(validationHttpMiddleware(validator))
  .handler(handler)
