import {
  CrateMover9000,
  parseStacks,
  steps,
} from './part1.js'

class CrateMover9001 extends CrateMover9000 {
  moveItems({ source, destination, moveCount }) {
    destination.add(...source.grab(moveCount))
  }
}

const crateMover = parseStacks(CrateMover9001)

steps.forEach(crateMover.applyStep.bind(crateMover))

const topItems = crateMover.stacks.map((stack) => stack.contents.slice(-1)[0])
console.log('Part 2:', topItems.join(''))
