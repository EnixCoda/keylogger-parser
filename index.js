const Promise = require('bluebird')
let fs = require('fs')
fs = Promise.promisifyAll(fs)

async function readAndCount() {
  try {
    const rawData = await fs.readFileAsync('/var/log/keystroke.log', 'utf-8')
    const Parser = require('./Parser')
    const parser = new Parser(rawData)
    const table = {}
    let currentKey = parser.nextKey()
    while (currentKey) {
      if (typeof table[currentKey] === 'undefined') table[currentKey] = 0
      table[currentKey]++
      currentKey = parser.nextKey()
    }
    return table
  } catch (err) {
    console.error(err)
  }
}

readAndCount()
  .then(table => 
    console.log(JSON.stringify(table, null, '  '))
  )
