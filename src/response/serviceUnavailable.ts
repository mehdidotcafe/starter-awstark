import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(SERVICE_UNAVAILABLE_HTTP_STATUS, message ?? SERVICE_UNAVAILABLE_MESSAGE, data)

const SERVICE_UNAVAILABLE_HTTP_STATUS = 503
const SERVICE_UNAVAILABLE_MESSAGE = 'Service unavailable'
