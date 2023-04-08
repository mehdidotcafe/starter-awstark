import User from '../User'

export default interface IUserPersistance {
  readonly getByEmail: (user: User['email']) => Promise<Partial<User> | undefined>
  readonly createIfNotExists: (user: Pick<User, 'email' | 'firstname' | 'password'>) => Promise<Pick<User, 'id' | 'email' | 'firstname'> | undefined>
}
