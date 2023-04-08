import type ApiResponse from '../../../src/domain/http/ApiResponse'
import handler from '../../../src/handlers/status'

describe('Status', () => {
  it('should return up', async () => {
    const result: ApiResponse = await handler()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      message: 'up',
    })
  })
})
