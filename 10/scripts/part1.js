import input from './input.js'

const instructions = input.map((line) => {
  const [cmd, arg] = line.split(/\s/)

  return {
    cmd,
    arg,
  }
})

let register = 1

const states = [register]

let wait = 0
let finish = null
while(instructions.length) {
  if(wait > 0) {
    wait -= 1

    if(wait === 0) {
      finish()
    }
  } else {
    const instruction = instructions.shift()
    switch(instruction.cmd) {
      case 'noop': {
        break
      }
      case 'addx': {
        wait = 1
        finish = () => register += parseInt(instruction.arg)
        break
      }
    }
  }

  states.push(register)
}

const relevantPowers = [20, 60, 100, 140, 180, 220].map((cycle) => {
  const value = states[cycle - 1]
  return value * cycle
})

export { states }

console.log('Part 1:', relevantPowers.reduce((s, v) => s + v))
