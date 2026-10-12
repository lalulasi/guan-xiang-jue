import { describe, expect, it } from 'vitest'
import { castReading, getHexagram, normalizeNumber } from './divination'

describe('normalizeNumber', () => {
  it('adds every visible digit as the source image describes', () => {
    expect(normalizeNumber('35')).toEqual({ input: '35', digitSum: 8 })
    expect(normalizeNumber('10 5')).toEqual({ input: '105', digitSum: 6 })
  })

  it('rejects text without a number', () => {
    expect(() => normalizeNumber('无')).toThrow('请输入至少一个数字')
  })
})

describe('hexagram mapping', () => {
  it('uses the King Wen sequence for upper and lower trigrams', () => {
    expect(getHexagram(1, 1).name).toBe('乾为天')
    expect(getHexagram(8, 8).name).toBe('坤为地')
    expect(getHexagram(1, 8).name).toBe('天地否')
  })

  it('produces a deterministic reading for the same number and hour', () => {
    const moment = new Date(2026, 9, 12, 15, 30)
    const reading = castReading('27', moment)

    expect(reading.digitSum).toBe(9)
    expect(reading.upper.name).toBe('乾')
    expect(reading.lower.name).toBe('坤')
    expect(reading.primary.name).toBe('天地否')
    expect(reading.changingLine).toBe(2)
    expect(reading.transformed.name).toBe('天水讼')
  })
})
