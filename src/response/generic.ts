import ApiResponse from '../domain/http/ApiResponse'

const genericResponse = (
  statusCode: number,
  message: ApiResponse['body']['message'],
  data?: ApiResponse['body']['data'],
  errors?: ApiResponse['body']['errors'],
) => ({
  statusCode,
  body: {
    message,
    ...(data && { data }),
    ...(errors && { errors }),
  },
})

export default genericResponse
