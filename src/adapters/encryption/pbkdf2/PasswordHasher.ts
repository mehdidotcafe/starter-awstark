import { pbkdf2, randomBytes } from 'node:crypto'

import IPasswordHasher, { PasswordHasherError } from '../../../domain/encryption/IPasswordHasher'

const ALGORITHM_ITERATIONS = 10000
const ALGORITHM_KEY_LENGTH = 512
const ALGORITHM = 'sha512'

const SALT_LENGTH = 16

const algorithm = (password: string, saltString: string) => new Promise((resolve, reject) => {
  pbkdf2(
    password,
    saltString,
    ALGORITHM_ITERATIONS,
    ALGORITHM_KEY_LENGTH,
    ALGORITHM,
    (err, derivedKey) => {
      if (err) {
        reject(new PasswordHasherError('UNKNOWN'))
      } else {
        resolve(derivedKey.toString('hex'))
      }
    },
  )
})

const salt = async () => randomBytes(SALT_LENGTH).toString('hex')

export const hash: IPasswordHasher['hash'] = async (password) => {
  try {
    const saltString = await salt()
    const hashString = await algorithm(password, saltString)

    return `${saltString}$${hashString}`
  } catch (err) {
    throw new PasswordHasherError('UNKNOWN')
  }
}

export const verify: IPasswordHasher['verify'] = async (password, hashedPassword) => {
  const [saltString, hashString] = hashedPassword.split('$')
  const hashStringToCompare = await algorithm(password, saltString)

  return hashStringToCompare === hashString
}
