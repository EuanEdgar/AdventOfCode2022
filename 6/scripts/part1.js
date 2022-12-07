import input from './input.js'

const chars = input.split('')

const checkFromIndex = (index, count) => {
  const lastN = chars.slice(index, index + count)
  return lastN.every((v, i, a) => a.indexOf(v) === i)
}

export const findMarkerIndex = (length) => {
  let index
  for(index = 0; index < chars.length - length; index++) {
    if(checkFromIndex(index, length)) {
      break
    }
  }
  return index + length
}

console.log('Part 1:', findMarkerIndex(4))
