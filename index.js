const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const Parser = require('./Parser')

async function readAndCount() {
  try {
    const rawData = await fs.readFileAsync('/var/log/keystroke.log', 'utf-8')
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
  .then(sort)
  // .then(countSum)

function sort(table) {
  const sortedTable = Object.entries(table).sort(sortByStroke)
  sortedTable.forEach(([key, value]) => table[key] = value)
  sortedTable.forEach(([key, value]) => console.log(`${key}: ${value}`))
}

function sortByKey(prev, cur) {
  return prev[0] > cur[0] ? 1 : -1
}

function sortByStroke(prev, cur) {
  return prev[1] > cur[1] ? 1 : -1
}

function countSum(table) {
  /* count total stroke times */
  console.log(table.reduce((total, cur) => {
    return (+cur[1])+total
  }, 0))
}
