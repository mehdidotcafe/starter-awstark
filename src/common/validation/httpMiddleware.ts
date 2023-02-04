import middy from '@middy/core'
import type { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {
  z, ZodError, ZodObject, ZodRawShape,
} from 'zod'

const httpMiddleware = (validator: ZodObject<ZodRawShape>): Returns => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<void> => {
    const params = validator.parse(request.event)

    Object.assign(request.event, {
      ...request.event,
      ...params,
    })
  }

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<void> => {
    if (request.error instanceof ZodError) {
      request.response = {
        statusCode: VALIDATION_ERROR_STATUS_CODE,
        body: JSON.stringify({
          message: VALIDATION_ERROR_MESSAGE,
          errors: (request.error as ZodError).issues,
        }),
      }
    }
  }

  return {
    before,
    onError,
  }
}

const VALIDATION_ERROR_STATUS_CODE = 400
const VALIDATION_ERROR_MESSAGE = 'Invalid request'

type Returns = middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult>

export type ValidatedEvent<EventSchema extends ZodObject<ZodRawShape>> = Omit<
APIGatewayEvent,
keyof z.infer<EventSchema>
> &
z.infer<EventSchema>

export default httpMiddleware
