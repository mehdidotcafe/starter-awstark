type FakeRequest = {
  readonly body?: Record<string, string | number | Date>
  readonly headers?: Record<string, string>
  readonly queryStringParameters?: Record<string, string>
}

export default ({
  body = {},
  headers = {},
  queryStringParameters = {},
}: FakeRequest = {}) => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  },
  body: JSON.stringify(body),
  queryStringParameters,
} as any)
