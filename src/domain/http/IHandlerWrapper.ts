import { z } from 'zod'

import type IHandler from './IHandler'

export default interface IHandlerWrapper {
  <Validator extends z.ZodObject<z.ZodRawShape>>(
    validator: Validator,
    handler: IHandler<Validator>,
  ): any
}
