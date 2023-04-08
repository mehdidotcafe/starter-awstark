import handler from '../../../src/handlers/status/isUp'
import makeFakeContext from '../factories/makeFakeContext'
import makeFakeRequest from '../factories/makeFakeRequest'

describe('Status', () => {
  it('should always be up', async () => {
    const result = await handler(makeFakeRequest(), makeFakeContext())

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual({
      message: 'up',
    })
  })
})
