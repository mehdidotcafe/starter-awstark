import { z } from 'zod'

import ErrorPersistance from '../../domain/db/ErrorPersistance'
import IUserPersistance from '../../domain/db/IUserPersistance'
import type ApiEvent from '../../domain/http/ApiEvent'
import type ApiResponse from '../../domain/http/ApiResponse'
import conflict from '../../response/conflict'
import serviceUnavailable from '../../response/serviceUnavailable'
import success from '../../response/success'

export const validator = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(9).max(255),
    firstname: z.string().min(1).max(255),
  }),
})

export default ({ createIfNotExists }: Pick<IUserPersistance, 'createIfNotExists'>) => async (
  event: ApiEvent<typeof validator>,
): Promise<ApiResponse> => {
  const userToCreate = event.body

  try {
    const createdUser = await createIfNotExists(userToCreate)

    return success({
      message: 'User created',
      data: createdUser,
    })
  } catch (err) {
    if (
      err instanceof ErrorPersistance
      && err.message === 'UNIQUE_VIOLATION'
    ) {
      return conflict({
        message: 'A user with this email already exists',
      })
    }
  }

  return serviceUnavailable({
    message: 'Service unavailable',
  })
}
