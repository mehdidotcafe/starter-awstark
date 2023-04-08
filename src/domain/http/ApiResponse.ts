type ApiResponse = {
  statusCode: number
  headers?: Record<string, string>
  body: {
    message: string
    data?: Record<string, unknown>
    errors?: ApiResponseError[]
  }
}

type ApiResponseError = {
  path: (string | number)[]
  message: string
}

export default ApiResponse
