import { z } from 'zod'

import IUserPersistance from '../../domain/db/IUserPersistance'
import type IHandler from '../../domain/http/IHandler'
import notFound from '../../response/notFound'
import serviceUnavailable from '../../response/serviceUnavailable'
import success from '../../response/success'

export const validator = z.object({
  queryStringParameters: z.object({
    email: z.string().email(),
  }),
})

export const handler: IHandler<typeof validator, Pick<IUserPersistance, 'getByEmail'>> = ({ getByEmail }) => async (
  event,
) => {
  const { email } = event.queryStringParameters

  try {
    const foundUser = await getByEmail(email)

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
    })
  }
}
