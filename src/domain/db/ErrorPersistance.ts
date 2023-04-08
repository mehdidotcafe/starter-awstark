type Message = 'UNIQUE_VIOLATION' | 'UNKNOWN'

export default class ErrorPersistance extends Error {
  message: Message

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(message: Message, options?: ErrorOptions) {
    super(message, options)
  }
}
