import createIfNotExistsHandler from '../../../src/handlers/user/createIfNotExists'
import getByEmailHandler from '../../../src/handlers/user/getByEmail'
import makeFakeUser from '../../factories/makeFakeUser'
import makeFakeContext from '../factories/makeFakeContext'
import makeFakeRequest from '../factories/makeFakeRequest'

describe('Get user by email', () => {
  it('should get user by email when user exists', async () => {
    const userToCreate = makeFakeUser()

    await createIfNotExistsHandler(makeFakeRequest({
      body: userToCreate,
    }), makeFakeContext())

    const result = await getByEmailHandler(makeFakeRequest({
      queryStringParameters: {
        email: userToCreate.email,
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual({
      message: 'User found',
      data: {
        id: expect.any(Number),
        email: userToCreate.email,
        firstname: userToCreate.firstname,
      },
    })
  })

  it('should NOT get user by email when doesn\'t user exist', async () => {
    const userWhoDoesntExist = makeFakeUser()

    const result = await getByEmailHandler(makeFakeRequest({
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
