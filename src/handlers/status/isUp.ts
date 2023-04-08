import handlerWrapper from '../../adapters/http/middy/HandlerWrapper'
import handler, { validator } from '../../useCases/status/isUp'

export default handlerWrapper(validator, handler)
