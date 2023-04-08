import User from '../../src/domain/User'

export default (partialUser: Partial<User> = {}) => {
  const timestamp = new Date().getTime()

  return {
    email: `email_${timestamp}@valid.com`,
    password: `password_${timestamp}`,
    firstname: `firstname_${timestamp}`,
    ...partialUser,
  }
}
