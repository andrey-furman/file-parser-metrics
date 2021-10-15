const fs = require('fs')
const fsPromises = require('fs/promises')
const readline = require('readline')
const path = require('path')

/**
 *
 * @param {string} sourceFilePath
 * @param {string} targetFilePath
 * @returns {Promise<void>}
 */
async function main (sourceFilePath, targetFilePath) {
  const targetPath = targetFilePath || path.join(__dirname, '..', '..', 'data', 'data-target.csv')
  const sourcePath = sourceFilePath || path.join(__dirname, '..', '..', 'data', 'data-source.csv')

  console.time('test')
  await fsPromises.truncate(targetPath)
  const readStream = fs.createReadStream(sourcePath)
  const writeStream = fs.createWriteStream(targetPath)
  const rl = readline.createInterface({
    input:     readStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    writeStream.write(`${line}\n`)
  }
  console.timeEnd('test')
}

module.exports = {
  main
}
