const genericResponse = (statusCode: number, message: string, data?: Record<string, unknown>) => ({
  statusCode,
  body: {
    message,
    ...(data && { data }),
  },
})

export default genericResponse
