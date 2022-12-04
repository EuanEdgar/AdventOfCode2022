import { elfRangePairs } from './part1.js'

const countOfPairsWithSomeOverlap = elfRangePairs.reduce((count, [range1, range2]) => {
  if(range1.overlaps(range2)) {
    return count + 1
  }
  return count
}, 0)

console.log('Part 2:', countOfPairsWithSomeOverlap)
