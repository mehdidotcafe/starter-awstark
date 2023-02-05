import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(BAD_REQUEST_HTTP_STATUS, message ?? BAD_REQUEST_MESSAGE, data)

const BAD_REQUEST_HTTP_STATUS = 400
const BAD_REQUEST_MESSAGE = 'Bad request'
