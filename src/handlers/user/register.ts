import { createIfNotExists } from '../../adapters/db/prisma/UserPersistance'
import { hash } from '../../adapters/encryption/pbkdf2/PasswordHasher'
import handlerWrapper from '../../adapters/http/middy/handlerWrapper'
import { handler, validator } from '../../useCases/user/register'

export default handlerWrapper(validator, handler({
  userPersistance: { createIfNotExists },
  passwordHasher: { hash },
}))
