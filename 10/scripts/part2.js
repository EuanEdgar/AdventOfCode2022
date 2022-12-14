import { states } from './part1.js'

const HEIGHT = 6
const WIDTH = 40
const screen = [...new Array(HEIGHT)].map(() => [...new Array(WIDTH)])

states.slice(0, HEIGHT * WIDTH).forEach((register, cycle) => {
  const screenY = Math.floor(cycle / WIDTH)
  const screenX = cycle % WIDTH

  const pixel = [screenX - 1, screenX, screenX + 1].includes(register) ? '#' : '.'

  screen[screenY][screenX] = pixel
})

console.log('Part 2:')
console.log(screen.map((row) => row.join('')).join("\n"))
