import crypto from 'node:crypto'

import { hash, verify } from '../../../../../src/adapters/encryption/pbkdf2/PasswordHasher'

const mockNodePbkdf2 = (pbkdf2Implementation: (...args: unknown[]) => unknown) => jest.spyOn(crypto, 'pbkdf2').mockImplementation(pbkdf2Implementation)

describe('hash function', () => {
  it('should return a hashed password', async () => {
    const hashedPassword = await hash('password')

    expect(hashedPassword).toMatch(/[0-9a-f]+\$[0-9a-f]+$/)
  })

  it('should return UNKNOWN error if the hashing algorithm fails', async () => {
    const spy = mockNodePbkdf2(() => {
      throw new Error('error')
    })

    await expect(hash('password')).rejects.toThrowError('UNKNOWN')

    spy.mockRestore()
  })
})

describe('verify function', () => {
  it('should return true if the hashed password matches already hashed password', async () => {
    const password = 'password'
    const hashedPassword = '7f3084a8ca92eb11e4f1456ba22d5119$85af955dea5a3111ba830769aa994cb3edff65d7cfa1092ec94fdccf1af35123cbb5f34446d302fe58f5185e96a66eba08e63e5ba32409602b7c631eebd95b936863c838eaa828c3d8cdc997142505d34df99571bfa52ab071b7afd35c0f499802ccc2417bb41637ca473f084cdbe2acd9d231fc5f2956472cf72915f289e1a6c78a6896191b0afd89ab724808d538166d8f60c4c1e437da23dea8689e8eb0b3d556e5704e302cbec43651398a903bbf4b936486867255e2a3629f441132c43c51bce6bacf901efe6bcab75b6e79326f54d0277f70b02f546444d662e6d8db34ed2f9a7d68f895f468cc427bc4a46f4d93b1a94f322d78f550e0bdc63b468172add58ee712ea1a98ece57a7ca48a0d7816bf21be4e76d70b522bcff8571eafd5701b0559c4cfd8fbbb61193379d96ce9704c9d15ed67943279da4313edc385ab50973048f42c7c4c6e26decc7b0977773bff40625a1a70f717208679833276d075ef2673a31dd7fbbd45677c2eb226d62e108278ceebdf5915e199f8c194a3d822d38c9392e272255d7c35bf8a3f052204085b34e108ca912b0dd8096ff7de9f4a6c3a04642ba48e087b7e4a219f95ebe855b866e1fe2e3daa71a177e43b81fcb289d5f811bb4929c4bac0403bdba3439525b935132b13548813e6a9bc16214941dff165994137e9a196137ac0228ece580f6e84c4407cccaf50baa609b23402'
    const isCorrect = await verify(password, hashedPassword)

    expect(isCorrect).toBe(true)
  })

  it('should return false if the hashed password doesn\'t match already hashed password', async () => {
    const password = 'password'
    // hash for 'not-correct' string
    const hashedNotCorrectPassword = 'd24951d3ac945a51a201c952ccf9bd40$76c4a1b5c630be2b0510d586289748760c88a6fad1d5f74dba4a13b19387cf724e31b366342afaf4bef17450618b754549a49a31a702f6a45f3aeaeff803c8cbbd2786f91816cf748b6522fd4dda780886a33993c2745be28a868929065b70f7e5c7b90bcdabe31a3beab62e3c04fcf3b3ed5d2f6c8bfebb7e72780bfb60bf60d63440fc5a2641053dfb931c98454726146721d76aca60a4ae1999af9c6642ea28672299fd549fd6a2018c6badf59b21cd929c7a41612f004bb62ca87c3097fc02f4874d729a6952a51b714d0d724eb96d287c9065ea2af33e1f29fcad6ba3e8f9124d041d252803f6a72c860a0722a4673dea8e5a934f56e8ec629db55cdaa2cb64ba4ff6f2c79e0e369e31e8f977b86306296f4f224ddb029085a3a5477780b996c29b6d8d99e500a7ff7ce1d59415571a41d3c047e7e506f3a0c50041574732c3a3e876958b66cbb017654107ebba7d7d6c0e017be6680601990a965768841590fe4975310b44d3e8e8aa6a869a2dffea66c2570bfea30157f8755938805af52c5e74e7b3797c0d500eb4bc385bc9ed9343c7bbd467660e28588f92ed73463a32783c4614aea90e7cc39f52707a47791de2c5c814c8a0c5c6c1d19f76f499faac5f92cab74264883695251dcb7a46cd7f40b8c05e76c1fcfaa207da8e6342e12a2daa8fd9d126718e890308711976819adb449e6ecd35fb9037d382bbb5ee'
    const isCorrect = await verify(password, hashedNotCorrectPassword)

    expect(isCorrect).toBe(false)
  })

  it('should return UNKNOWN error if the hashing algorithm fails', async () => {
    const spy = mockNodePbkdf2(() => {
      throw new Error('error')
    })

    await expect(hash('password')).rejects.toThrowError('UNKNOWN')

    spy.mockRestore()
  })
})
