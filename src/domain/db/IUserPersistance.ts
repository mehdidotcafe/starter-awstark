import User from '../User'

export default interface IUserPersistance {
  readonly getByEmail: (user: User['email']) => Promise<Partial<User> | undefined>
  readonly createIfNotExists: (user: Pick<User, 'email' | 'firstname' | 'password'>) => Promise<Partial<User> | undefined>
}
