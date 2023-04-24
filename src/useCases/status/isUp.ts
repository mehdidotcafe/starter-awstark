import { z } from 'zod'

import IHandler from '../../domain/http/IHandler'
import internalError from '../../response/internalError'
import success from '../../response/success'

export const validator = z.object({})

export const handler: IHandler<typeof validator> = () => async () => {
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
