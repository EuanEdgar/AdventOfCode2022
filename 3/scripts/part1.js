import input from './input.js'


const backpacks = input.map((str) => {
  const arr = str.split('')
  const left = arr.slice(0, str.length / 2)
  const right = arr.slice(str.length / 2)

  return {
    left,
    right,
  }
})

// [a-z] = [1-26], [A-Z] = [27-52]
export const getPriority = (itemIdent) => {
  const code = itemIdent.charCodeAt(0)
  if(code < 96) {
    return code - 64 + 26
  }
  return code - 96
}

const overlapPrioritySum = backpacks.reduce((prioritySum, { left, right }) => {
  const shared = left.filter((itemIdent) => right.includes(itemIdent))
  const uniqueItems = shared.filter((v, i, a) => a.indexOf(v) === i)

  return prioritySum + uniqueItems.reduce((s, itemIdent) => s + getPriority(itemIdent), 0)
}, 0)

console.log('Part 1:', overlapPrioritySum)
