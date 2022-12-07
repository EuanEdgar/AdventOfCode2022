import ROOT, { Directory } from './fs.js'

const THRESHOLD = 100000
const directoriesWithSizeLessThanThreshold = []
const processDirectory = (directory) => {
  if(directory.totalSize < THRESHOLD) {
    directoriesWithSizeLessThanThreshold.push(directory)
  }

  Object.values(directory.contents).forEach((entry) => {
    if(entry instanceof Directory) {
      processDirectory(entry)
    }
  })
}
processDirectory(ROOT)
console.log('Part 1:', directoriesWithSizeLessThanThreshold.reduce((s, d) => d.totalSize + s, 0))
