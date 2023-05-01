import { getByEmail } from '../../adapters/db/prisma/UserPersistance'
import handlerWrapper from '../../adapters/http/middy/handlerWrapper'
import { handler, validator } from '../../useCases/user/getProfile'

export default handlerWrapper(validator, handler({ userPersistance: { getByEmail } }))
