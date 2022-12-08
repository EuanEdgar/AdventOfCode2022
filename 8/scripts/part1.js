import input from './input.js'

export const coordinates = [...new Array(input.length)].map((_, y) => (
  [...new Array(input[y].length)].map((_, x) => [y, x])
)).flat()

export function* generateTreeHeights(input, y, x, dY, dX) {
  const height = input[y][x]

  let currentY = y + dY
  let currentX = x + dX

  while(
    currentY >= 0 && currentY < input.length &&
      currentX >= 0 && currentX < input[currentY].length
  ) {
    yield input[currentY][currentX]

    currentY += dY
    currentX += dX
  }
}

export const DIRECTIONS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
}

const checkTreeVisible = (y, x) => (
  Object.values(DIRECTIONS).some((direction) => {
    const heightGenerator = generateTreeHeights(input, y, x, ...direction)

    let r = { value: -Infinity }
    while(!r.done && r.value < input[y][x]) {
      r = heightGenerator.next()
    }

    return r.value === undefined || r.value < input[y][x]
  })
)

const visibleTrees = coordinates.reduce((count, [y, x]) => (
  checkTreeVisible(y, x) ? count + 1 : count
), 0)

console.log('Part 1:', visibleTrees)
