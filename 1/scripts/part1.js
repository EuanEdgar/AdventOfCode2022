import input from './input.js'

export const elvesFromInput = (input) => (
  input.reduce((elves, c) => {
    if(!c) { elves.push([]) }
    else {
      elves[elves.length - 1].push(parseInt(c))
    }
    return elves
  }, [[]])
)

export const getPerElfCalorieCount = (elves) => (
  elves.map((clist) => clist.reduce((a, s) => a + s))
)

const elves = elvesFromInput(input)

console.log('Part 1:', getPerElfCalorieCount(elves).sort((a, b) => b - a)[0])
