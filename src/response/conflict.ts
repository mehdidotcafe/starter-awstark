import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(CONFLICT_HTTP_STATUS, message ?? CONFLICT_MESSAGE, data)

const CONFLICT_HTTP_STATUS = 409
const CONFLICT_MESSAGE = 'Conflict'
