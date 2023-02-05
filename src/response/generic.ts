const genericResponse = (statusCode: number, message: string, data?: Record<string, unknown>) => ({
  statusCode,
  body: JSON.stringify({
    message,
    data,
  }),
})

export default genericResponse
