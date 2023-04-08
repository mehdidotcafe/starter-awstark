import middy from '@middy/core'
import {
  ZodError, ZodObject, ZodRawShape,
} from 'zod'

import type ApiEvent from '../domain/http/ApiEvent'
import type ApiResponse from '../domain/http/ApiResponse'
import badRequest from '../response/badRequest'

const httpMiddleware = <Validator extends ZodObject<ZodRawShape>>(
  validator: Validator,
): Returns<Validator> => {
  const before: middy.MiddlewareFn<ApiEvent, ApiResponse> = async (
    request,
  ): Promise<void> => {
    const params = validator.parse(request.event)
    const parsedEvent: ApiEvent = {
      headers: request.event.headers,
      body: undefined,
      queryStringParameters: undefined,
      ...params,
    }

    request.event = parsedEvent
  }

  const onError: middy.MiddlewareFn<ApiEvent, ApiResponse> = async (
    request,
  ): Promise<void> => {
    if (request.error instanceof ZodError) {
      request.response = badRequest({
        message: VALIDATION_ERROR_MESSAGE,
        errors: mapZodErrorToApiErrors(request.error),
      })
    }
  }

  return {
    before,
    onError,
  }
}

const mapZodErrorToApiErrors = (error: ZodError): ApiResponse['body']['errors'] => error.issues.map((issue) => ({
  message: issue.message,
  path: issue.path,
}))

const VALIDATION_ERROR_MESSAGE = 'Validation error'

type Returns<Validator extends ZodObject<ZodRawShape>> = middy.MiddlewareObj<
ApiEvent<Validator>,
ApiResponse
>

export default httpMiddleware
