import middy from '@middy/core'

import type ApiEvent from '../../../domain/http/ApiEvent'

const before: middy.MiddlewareFn<ApiEvent> = async (
  request,
): Promise<void> => {
  const event: ApiEvent = {
    headers: request.event.headers,
    body: request.event.body,
    queryStringParameters: request.event.queryStringParameters,
  }

  request.event = event
}

export default {
  before,
}
