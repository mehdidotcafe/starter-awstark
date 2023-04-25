type Salt = string
type Password = string
type HashedPassword = `${Salt}$${string}`

export default interface IPasswordHasher {
  readonly hash: (password: Password) => Promise<HashedPassword>
  readonly verify: (password: Password, hashedPassword: HashedPassword) => Promise<boolean>
}

type PasswordHasherMessage = 'UNIQUE_VIOLATION' | 'UNKNOWN'

export class PasswordHasherError extends Error {
  message: PasswordHasherMessage

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(message: PasswordHasherMessage, options?: ErrorOptions) {
    super(message, options)
  }
}
