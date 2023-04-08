import { z } from 'zod'

import IUserPersistance from '../../domain/db/IUserPersistance'
import type ApiEvent from '../../domain/http/ApiEvent'
import type ApiResponse from '../../domain/http/ApiResponse'
import notFound from '../../response/notFound'
import serviceUnavailable from '../../response/serviceUnavailable'
import success from '../../response/success'

export const validator = z.object({
  queryStringParameters: z.object({
    email: z.string().email(),
  }),
})

export default (userPersistance: IUserPersistance) => async (
  event: ApiEvent<typeof validator>,
): Promise<ApiResponse> => {
  const { email } = event.queryStringParameters

  try {
    const foundUser = await userPersistance.getByEmail(email)

    if (!foundUser) {
      return notFound({
        message: 'User not found',
      })
    }

    return success({
      message: 'User found',
      data: foundUser,
    })
  } catch (err) {
    return serviceUnavailable({
      message: 'Service unavailable',
      data: {
        code: err.code,
        error: err.message,
      },
    })
  }
}
