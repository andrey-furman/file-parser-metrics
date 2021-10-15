const fs = require('fs')
const readline = require('readline')
const path = require('path')

const targetFilePath = path.join(__dirname, '..', '..', 'data', 'data-target.csv')
const sourceFilePath = path.join(__dirname, '..', '..', 'data', 'data-source.csv')

/**
 * @param {number} index
 */
function main (index) {
  console.time(`test #${index}`)
  fs.truncateSync(targetFilePath)
  const readStream = fs.createReadStream(sourceFilePath)
  const rl = readline.createInterface({
    input:     readStream,
    crlfDelay: Infinity
  })
  rl.on('line', line => fs.appendFileSync(targetFilePath, `${line}\n`))
  rl.on('close', () => {
      console.timeEnd(`test #${index}`)
    }
  )
}

main(10)
// ;(async () => {
//   const iterableArr = new Array(10).fill(0)
//   iterableArr.map(async (e, i) => {
//     await main(i)
//   })
// })()
