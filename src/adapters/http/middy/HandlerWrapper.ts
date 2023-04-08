import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { z } from 'zod'

import type IHandler from '../../../domain/http/IHandler'
import validationHttpMiddleware from '../../../validation/httpMiddleware'
import convertFromApiGatewayEvent from './convertFromApiGatewayEvent'
import convertToApiGatewayResponse from './convertToApiGatewayResponse'

const handlerWrapper = (
  validator: z.ZodObject<any>,
  handler: IHandler<any>,
) => middy()
  .use(convertToApiGatewayResponse)
  .use(httpJsonBodyParser())
  .use(convertFromApiGatewayEvent)
  .use(validationHttpMiddleware(validator))
  .handler(handler)

export default handlerWrapper
