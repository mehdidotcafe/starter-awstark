import { APIGatewayProxyResult } from 'aws-lambda'

import internalError from '../response/internalError'
import success from '../response/success'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return success({
      message: 'up',
    })
  } catch (err) {
    return internalError({
      message: 'down',
    })
  }
}

export default handler
