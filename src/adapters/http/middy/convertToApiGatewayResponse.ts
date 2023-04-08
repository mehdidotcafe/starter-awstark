import middy from '@middy/core'
import type { APIGatewayProxyResult } from 'aws-lambda'

import type ApiEvent from '../../../domain/http/ApiEvent'

const convertToApiGatewayResponse: middy.MiddlewareFn<ApiEvent, APIGatewayProxyResult> = async (
  request,
): Promise<void> => {
  if (request.response) {
    request.response = {
      statusCode: request.response.statusCode,
      headers: request.response.headers,
      body: JSON.stringify(request.response.body),
    }
  }
}

export default {
  after: convertToApiGatewayResponse,
  onError: convertToApiGatewayResponse,
}
