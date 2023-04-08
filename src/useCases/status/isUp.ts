import { z } from 'zod'

import type ApiResponse from '../../domain/http/ApiResponse'
import internalError from '../../response/internalError'
import success from '../../response/success'

export const validator = z.object({})

export default async (): Promise<ApiResponse> => {
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
