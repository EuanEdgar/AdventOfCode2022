import ROOT, { Directory } from './fs.js'

const MAX_SPACE = 70000000
const REQUIRED_SPACE = 30000000

const currentFreeSpace = MAX_SPACE - ROOT.totalSize
const extraRequiredSpace = REQUIRED_SPACE - currentFreeSpace

let smallestDirectoryGreaterThanRequired = { totalSize: Infinity }
const processDirectory = (directory) => {
  const { totalSize } = directory
  if(totalSize >= extraRequiredSpace && totalSize < smallestDirectoryGreaterThanRequired.totalSize) {
    smallestDirectoryGreaterThanRequired = directory
  }

  Object.values(directory.contents).forEach((entry) => {
    if(entry instanceof Directory) {
      processDirectory(entry)
    }
  })
}
processDirectory(ROOT)
console.log('Part 2:', smallestDirectoryGreaterThanRequired.totalSize)
