import persistanceUser from '../../adapters/db/prisma/UserPersistance'
import handlerWrapper from '../../adapters/http/middy/HandlerWrapper'
import handler, { validator } from '../../useCases/user/getByEmail'

export default handlerWrapper(validator, handler(persistanceUser))
