import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(INTERNAL_ERROR_HTTP_STATUS, message ?? INTERNAL_ERROR_MESSAGE, data)

const INTERNAL_ERROR_HTTP_STATUS = 500
const INTERNAL_ERROR_MESSAGE = 'Internal server error'
