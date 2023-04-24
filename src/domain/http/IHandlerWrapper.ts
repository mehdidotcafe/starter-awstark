import type IHandler from './IHandler'
import type IValidator from './IValidator'

export default interface IHandlerWrapper {
  <Validator extends IValidator>(
    validator: Validator,
    handler: IHandler<Validator>,
  ): any
}
