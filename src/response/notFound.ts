import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(NOT_FOUND_HTTP_STATUS, message ?? NOT_FOUND_MESSAGE, data)

const NOT_FOUND_HTTP_STATUS = 404
const NOT_FOUND_MESSAGE = 'Internal server error'
