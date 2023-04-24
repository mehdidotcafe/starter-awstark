import handlerWrapper from '../../adapters/http/middy/handlerWrapper'
import { handler, validator } from '../../useCases/status/isUp'

export default handlerWrapper(validator, handler())
