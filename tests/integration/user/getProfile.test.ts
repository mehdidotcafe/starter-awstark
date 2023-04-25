import getProfileHandler from '../../../src/handlers/user/getProfile'
import registerHandler from '../../../src/handlers/user/register'
import makeFakeUser from '../../factories/makeFakeUser'
import makeFakeContext from '../factories/makeFakeContext'
import makeFakeRequest from '../factories/makeFakeRequest'

describe('Get user profile by email', () => {
  it('should get user profile by email when user exists', async () => {
    const userToRegister = makeFakeUser()

    await registerHandler(makeFakeRequest({
      body: userToRegister,
    }), makeFakeContext())

    const result = await getProfileHandler(makeFakeRequest({
      queryStringParameters: {
        email: userToRegister.email,
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual({
      message: 'User found',
      data: {
        id: expect.any(Number),
        email: userToRegister.email,
        firstname: userToRegister.firstname,
      },
    })
  })

  it('should NOT get user profile by email when doesn\'t user exist', async () => {
    const userWhoDoesntExist = makeFakeUser()

    const result = await getProfileHandler(makeFakeRequest({
      queryStringParameters: {
        email: userWhoDoesntExist.email,
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(404)
    expect(JSON.parse(result.body)).toEqual({
      message: 'User not found',
    })
  })
})
