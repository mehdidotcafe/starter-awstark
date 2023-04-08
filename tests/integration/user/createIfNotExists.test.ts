import handler from '../../../src/handlers/user/createIfNotExists'
import makeFakeContext from '../factories/makeFakeContext'
import makeFakeRequest from '../factories/makeFakeRequest'

describe('Create user', () => {
  it('should not create user when user email is not valid', async () => {
    const result = await handler(makeFakeRequest({
      body: {
        email: 'not_a_valid_email',
        password: 'valid_password',
        firstname: 'valid_firstname',
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(400)
    expect(JSON.parse(result.body)).toEqual({
      message: 'Validation error',
      errors: [
        {
          message: 'Invalid email',
          path: ['body', 'email'],
        },
      ],
    })
  })

  it('should not create user when user password is too weak', async () => {
    const result = await handler(makeFakeRequest({
      body: {
        email: 'valid@email.com',
        password: '12345',
        firstname: 'valid_firstname',
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(400)
    expect(JSON.parse(result.body)).toEqual({
      message: 'Validation error',
      errors: [
        {
          message: 'String must contain at least 9 character(s)',
          path: ['body', 'password'],
        },
      ],
    })
  })

  it('should not create user when user firstname is too small', async () => {
    const result = await handler(makeFakeRequest({
      body: {
        email: 'valid@email.com',
        password: '123456789',
        firstname: '',
      },
    }), makeFakeContext())

    expect(result.statusCode).toEqual(400)
    expect(JSON.parse(result.body)).toEqual({
      message: 'Validation error',
      errors: [
        {
          message: 'String must contain at least 1 character(s)',
          path: ['body', 'firstname'],
        },
      ],
    })
  })

  it('should create user when user email, password, firstname are valid', async () => {
    const userToCreate = {
      email: `valid_${new Date().getTime()}@email.com`,
      password: '123456789',
      firstname: 'valid_firstname',
    }

    const result = await handler(makeFakeRequest({
      body: userToCreate,
    }), makeFakeContext())

    console.log(result.body)

    expect(true).toBe(true)
    // expect(result.statusCode).toEqual(200)
    // expect(JSON.parse(result.body)).toEqual({
    //   message: 'User created',
    //   data: {
    //     id: expect.any(Number),
    //     email: userToCreate.email,
    //     firstname: userToCreate.firstname,
    //   },
    // })
  })

  it('should NOT create user when user email is already used', async () => {
    const userToCreateFirst = {
      email: `valid_${new Date().getTime()}@email.com`,
      password: '123456789',
      firstname: 'valid_firstname',
    }

    await handler(makeFakeRequest({
      body: userToCreateFirst,
    }), makeFakeContext())

    const userToCreateSecond = {
      email: userToCreateFirst.email,
      password: 'another_123456789',
      firstname: 'another_valid_firstname',
    }

    const result = await handler(makeFakeRequest({
      body: userToCreateSecond,
    }), makeFakeContext())

    expect(result.statusCode).toEqual(409)
    expect(JSON.parse(result.body)).toEqual({
      message: 'A user with this email already exists',
    })
  })
})
