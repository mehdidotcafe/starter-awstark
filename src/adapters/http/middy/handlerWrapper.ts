import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'

import type { InjectedIHandler } from '../../../domain/http/IHandler'
import type IValidator from '../../../domain/http/IValidator'
import validationHttpMiddleware from '../../../validation/httpMiddleware'
import convertFromApiGatewayEvent from './convertFromApiGatewayEvent'
import convertToApiGatewayResponse from './convertToApiGatewayResponse'

const handlerWrapper = <Validator extends IValidator>(
  validator: Validator,
  handler: InjectedIHandler<Validator>,
) => middy()
    .use(convertToApiGatewayResponse)
    .use(httpJsonBodyParser())
    .use(convertFromApiGatewayEvent)
    .use(validationHttpMiddleware(validator))
    .handler(handler)

export default handlerWrapper
