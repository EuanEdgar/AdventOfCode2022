import input from './input.js'

const [initialStacks, instructions] = input.split(/\n{2}/)

export class CrateMover9000 {
  constructor({ stacks }) {
    this.stacks = stacks
  }

  applyStep(step) {
    const source = this.stacks[step.start - 1]
    const destination = this.stacks[step.end - 1]
    this.moveItems({ source, destination, moveCount: step.moveCount })
  }

  moveItems({ source, destination, moveCount }) {
    for(let x = 0; x < moveCount; x++) {
      destination.add(source.pick())
    }
  }
}

class Stack {
  constructor({ contents }) {
    this.contents = contents
  }

  pick() {
    return this.contents.pop()
  }

  grab(count) {
    return this.contents.splice(-count, count)
  }

  add(...items) {
    this.contents.push(...items)
  }
}

const parseStack = (index) => {
  const items = initialStacks.split(/\n/g).slice(0, -1).map((row) => row[(index - 1) * 4 + 1]).filter((s) => s && s.trim())
  return new Stack({ contents: items.reverse() })
}

export const parseStacks = (CrateMoverClass = CrateMover9000) => {
  const indicies = initialStacks.split(/\n/g).slice(-1)[0].split(/\s+/).slice(1).map((s) => parseInt(s))
  return new CrateMoverClass({ stacks: indicies.map((index) => parseStack(index)) })
}

const crateMover = parseStacks()

class Step {
  constructor({ moveCount, start, end }) {
    this.moveCount = moveCount
    this.start = start
    this.end = end
  }
}

const moveRegex = /move (\d+) from (\d+) to (\d+)/
const parseStep = (stepDescriptor) => {
  const [
    moveCount,
    start,
    end
  ] = moveRegex.exec(stepDescriptor).slice(1).map((s) => parseInt(s))

  return new Step({ moveCount, start, end })
}

export const steps = instructions.split(/\n/g).map(parseStep)

steps.forEach(crateMover.applyStep.bind(crateMover))

const topItems = crateMover.stacks.map((stack) => stack.contents.slice(-1)[0])
console.log('Part 1:', topItems.join(''))
