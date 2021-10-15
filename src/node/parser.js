const fs = require('fs')
const fsPromises = require('fs/promises')
const readline = require('readline')
const path = require('path')

const targetFilePath = path.join(__dirname, '..', '..', 'data', 'data-target.csv')
const sourceFilePath = path.join(__dirname, '..', '..', 'data', 'data-source.csv')

async function main () {
  console.time('test')
  await fsPromises.truncate(targetFilePath)
  const readStream = fs.createReadStream(sourceFilePath)
  const writeStream = fs.createWriteStream(targetFilePath)
  const rl = readline.createInterface({
    input:     readStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    writeStream.write(`${line}\n`)
  }
  console.timeEnd('test')
}

;(async () => {
  await main()
})()
