import { compareVersionNumbers } from '../compareVersionNumbers'

describe('compareVersionNumbers', () => {
  it('should compare if version is lower than required', () => {
    const validation = compareVersionNumbers('6', '5')
    expect(validation).toBe(1)
  })
  it('should compare if version is higher than required', () => {
    const validation = compareVersionNumbers('6', '7')
    expect(validation).toBe(-1)
  })
  it('should compare if version is same as required', () => {
    const validation = compareVersionNumbers('6', '6')
    expect(validation).toBe(0)
  })
  it('should check if version is not valid', () => {
    const validation = compareVersionNumbers('6', 'hello')
    expect(validation).toBe(NaN)
  })
})
