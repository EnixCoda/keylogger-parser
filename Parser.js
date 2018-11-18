const ignoreChars = new Set('\n')

class Parser {
  constructor(rawData) {
    this.index = 0
    this.rawData = rawData
    this.end = rawData.length
  }

  nextKey() {
    if (this.index === this.end) return null
    const buffer = []
    let keepReading = false
    do {
      let currentChar = this.rawData[this.index++]
      if (ignoreChars.has(currentChar)) {
        keepReading = true
      } else {
        if (currentChar === '[') keepReading = true
        if (currentChar === ']') keepReading = false
        buffer.push(currentChar)
      }
    } while (keepReading)
    let key = buffer.join('')
    if (key.length > 1 && !this.isSpecialKey(key)) {
      this.index -= key.length - 1
      key = key[0]
    }
    return key
  }

  isSpecialKey(key) {
    return !!Parser.specialKeys[key]
  }

  static get specialKeys() {
    return {
      '[left-shift]': 1,
      '[right-shift]': 1,
      '[left-ctrl]': 1,
      '[right-ctrl]': 1,
      '[left-cmd]': 1,
      '[right-cmd]': 1,
      '[right-option]': 1,
      '[left-option]': 1,
      '[up]': 1,
      '[down]': 1,
      '[left]': 1,
      '[right]': 1,
      '[pgup]': 1,
      '[pgdown]': 1,
      '[home]': 1,
      '[end]': 1,
      '[esc]': 1,
      '[tab]': 1,
      '[caps]': 1,
      '[del]': 1,
      '[return]': 1,
      '[fn]': 1,
      '[f1]': 1,
      '[f2]': 1,
      '[f3]': 1,
      '[f4]': 1,
      '[f5]': 1,
      '[f6]': 1,
      '[f7]': 1,
      '[f8]': 1,
      '[f9]': 1,
      '[f10]': 1,
      '[f11]': 1,
      '[f12]': 1,
      '[unknown]': 1,
    }
  }
}

module.exports = Parser
