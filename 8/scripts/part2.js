import input from './input.js'

import { coordinates, generateTreeHeights, DIRECTIONS } from './part1.js'

const calculateScore = ([y, x]) => {
  const scores = Object.values(DIRECTIONS).map((direction) => {
    const heightGenerator = generateTreeHeights(input, y, x, ...direction)

    let count = 0

    let r;
    do {
      r = heightGenerator.next()

      if(r.value !== undefined) {
        count += 1
      }
    } while(r.value !== undefined && r.value < input[y][x])

    return count
  })

  return scores.reduce((p, c) => c * p)
}

window.generateTreeHeights = generateTreeHeights
window.input = input

const bestTree = coordinates.reduce((bestTree, coordinates) => {
  const score = calculateScore(coordinates)
  if(score > bestTree.score) {
    return {
      coordinates,
      score,
    }
  }

  return bestTree
}, { coordinates: null, score: -Infinity})

console.log('Part 2:', bestTree.score)
