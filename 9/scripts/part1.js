import input from './input.js'

const DIRECTIONS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

export const instructions = input.map((line) => {
  const [dir, count] = line.split(/\s/)

  let movement = [0, 0];
  switch(dir) {
    case 'U':
      movement = DIRECTIONS.up
      break
    case 'D':
      movement = DIRECTIONS.down
      break
    case 'L':
      movement = DIRECTIONS.left
      break
    case 'R':
      movement = DIRECTIONS.right
      break
  }

  return {
    movement,
    count: parseInt(count),
  }
})

export class Head {
  constructor([x, y], tailDepth) {
    this.x = x
    this.y = y
    this.tail = new Tail([x, y], tailDepth - 1)
  }

  execute(instruction) {
    for(let i = 0; i < instruction.count; i++) {
      const { x, y } = this
      const [dX, dY] = instruction.movement
      const newX = x + dX
      const newY = y + dY

      this.x = newX
      this.y = newY

      this.tail.adjustFor([newX, newY])
    }
  }

  get lastTail() {
    let tail = this.tail

    if(!tail) {
      return null
    }

    while(tail.tail) {
      tail = tail.tail
    }

    return tail
  }
}

class Tail {
  constructor([x, y], tailDepth) {
    this.x = x
    this.y = y
    this.positions = {
      [`${x},${y}`]: true
    }
    if(tailDepth > 1) {
      this.tail = new Tail([x, y], tailDepth - 1)
    }
  }
  adjustFor([headX, headY]) {
    const { x, y } = this

    if(!adjacent([x, y], [headX, headY])) {
      const transform = [headX - x, headY - y].map((v) => {
        if(v === 0) {
          return 0
        }

        return v > 0 ? 1 : -1
      })
      this.x += transform[0]
      this.y += transform[1]

      this.positions[`${this.x},${this.y}`] = true

      if(this.tail) {
        this.tail.adjustFor([this.x, this.y])
      }
    }
  }
}

function adjacent([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1
}

const head = new Head([0, 0], 1)

instructions.forEach((instruction) => head.execute(instruction))

console.log('Part 1:', Object.keys(head.tail.positions).length)
