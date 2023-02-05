import generic from './generic'

export default ({
  message,
  data,
}: {
  message?: Parameters<typeof generic>[1]
  data?: Parameters<typeof generic>[2]
} = {}) => generic(SUCCESS_HTTP_STATUS, message ?? SUCCESS_MESSSAGE, data)

const SUCCESS_HTTP_STATUS = 200
const SUCCESS_MESSSAGE = 'Success'
