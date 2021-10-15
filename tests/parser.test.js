const path = require('path')
const fs = require('fs')

const { main } = require('../src/node/parser')

describe.skip('File generator', () => {})

describe('Parser', () => {
  const sourceFilePath = path.join(__dirname, 'fixtures', 'data', 'source.csv')
  const targetFilePath = path.join(__dirname, 'fixtures', 'data', 'target.csv')

  async function callParser() {
    await main(sourceFilePath, targetFilePath)
  }

  it('source file keeps with initial data', async () => {
    const sourceFileSizeBeforeParsing = fs.statSync(sourceFilePath).size

    await callParser()

    expect(sourceFileSizeBeforeParsing).toEqual(fs.statSync(sourceFilePath).size)
  })

  it('target file fills data from the source file', async () => {
    await callParser()
    const targetFileSizeAfterParsing = fs.statSync(targetFilePath).size

    expect(targetFileSizeAfterParsing).not.toEqual(0)
  })

  it.skip('source file is equal to target file', async () => {
    await callParser()
    const sourceFileSize = fs.statSync(sourceFilePath).size
    const targetFileSize = fs.statSync(targetFilePath).size

    // TODO resolve issue with file size equality
    expect(sourceFileSize).toEqual(targetFileSize)
  })
})
