import input from './input.js'

import { elvesFromInput, getPerElfCalorieCount } from './part1.js'

const elves = elvesFromInput(input)

const calorieCounts = getPerElfCalorieCount(elves).sort((a, b) => b - a)

const top3Elves = calorieCounts.slice(0, 3)

console.log('Part 2:', top3Elves.reduce((s, eC) => s + eC))
