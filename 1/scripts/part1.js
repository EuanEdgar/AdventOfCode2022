import input from './input.js'

// Input is sequence of integer strings followed by a blank line separator
// Convert input into 2d array where each subarray is the input for an elf
export const elvesFromInput = (input) => (
  input.reduce((elves, c) => {
    if(!c) { elves.push([]) }
    else {
      elves[elves.length - 1].push(parseInt(c))
    }
    return elves
  }, [[]])
)

// Convert list of lists of per-elf calories into list of calorie totals
export const getPerElfCalorieCount = (elves) => (
  elves.map((clist) => clist.reduce((a, s) => a + s))
)

const elves = elvesFromInput(input)

console.log('Part 1:', getPerElfCalorieCount(elves).sort((a, b) => b - a)[0])
