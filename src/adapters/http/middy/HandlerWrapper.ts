import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { z } from 'zod'

import type IHandler from '../../../domain/http/IHandler'
import type IHandlerWrapper from '../../../domain/http/IHandlerWrapper'
import validationHttpMiddleware from '../../../validation/httpMiddleware'
import convertFromApiGatewayEvent from './convertFromApiGatewayEvent'
import convertToApiGatewayResponse from './convertToApiGatewayResponse'

const handlerWrapper: IHandlerWrapper = (
  validator: z.ZodObject<any>,
  handler: IHandler<any>,
) => middy()
  .use(httpJsonBodyParser())
  .use(convertFromApiGatewayEvent)
  .use(validationHttpMiddleware(validator))
  .use(convertToApiGatewayResponse)
  .handler(handler)

export default handlerWrapper
