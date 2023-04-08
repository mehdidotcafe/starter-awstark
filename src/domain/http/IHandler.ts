import { z } from 'zod'

import type ApiEvent from './ApiEvent'
import type ApiResponse from './ApiResponse'

export default interface IHandler<Validator extends z.ZodObject<z.ZodRawShape>> {
  (event: ApiEvent<Validator>): Promise<ApiResponse>
}
