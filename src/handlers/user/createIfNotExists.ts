import { createIfNotExists } from '../../adapters/db/prisma/UserPersistance'
import handlerWrapper from '../../adapters/http/middy/HandlerWrapper'
import handler, { validator } from '../../useCases/user/createIfNotExists'

export default handlerWrapper(validator, handler({ createIfNotExists }))
