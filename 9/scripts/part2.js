import { Head, instructions } from './part1.js'

const head = new Head([0, 0], 10)

instructions.forEach((instruction) => head.execute(instruction))

console.log('Part 2:', Object.keys(head.lastTail.positions).length)
