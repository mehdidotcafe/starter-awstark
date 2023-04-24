import type ApiEvent from './ApiEvent'
import type ApiResponse from './ApiResponse'
import type IValidator from './IValidator'

export interface InjectedIHandler<Validator extends IValidator> {
  (event: ApiEvent<Validator>): Promise<ApiResponse>
}

export default interface IHandler<
  Validator extends IValidator,
  Dependencies extends unknown | never = never,
> {
  (...args: (
    Dependencies extends undefined ? [never] : [Dependencies]
  )): InjectedIHandler<Validator>
}
