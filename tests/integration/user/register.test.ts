import handler from '../../../src/handlers/user/register'
import makeFakeContext from '../factories/makeFakeContext'
import makeFakeRequest from '../factories/makeFakeRequest'

describe('Register user', () => {
  it('should not register user when user email is not valid', async () => {
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

  it('should not register user when user password is too weak', async () => {
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

  it('should not register user when user firstname is too small', async () => {
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

  it('should register user when user email, password, firstname are valid', async () => {
    const userToRegister = {
      email: `valid_${new Date().getTime()}@email.com`,
      password: '123456789',
      firstname: 'valid_firstname',
    }

    const result = await handler(makeFakeRequest({
      body: userToRegister,
    }), makeFakeContext())

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual({
      message: 'User registered',
      data: {
        id: expect.any(Number),
        email: userToRegister.email,
        firstname: userToRegister.firstname,
      },
    })
  })

  it('should NOT register user when user email is already used', async () => {
    const userToRegisterFirst = {
      email: `valid_${new Date().getTime()}@email.com`,
      password: '123456789',
      firstname: 'valid_firstname',
    }

    await handler(makeFakeRequest({
      body: userToRegisterFirst,
    }), makeFakeContext())

    const userToRegisterSecond = {
      email: userToRegisterFirst.email,
      password: 'another_123456789',
      firstname: 'another_valid_firstname',
    }

    const result = await handler(makeFakeRequest({
      body: userToRegisterSecond,
    }), makeFakeContext())

    expect(result.statusCode).toEqual(409)
    expect(JSON.parse(result.body)).toEqual({
      message: 'A user with this email already exists',
    })
  })
})
