import input from './input.js'

const plays = input.map((row) => row.split(/\s/))

const scoreMap = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
}

const score = plays.reduce((score, [foe, player]) => (
  score + scoreMap[foe][player]
), 0)

console.log(score)
