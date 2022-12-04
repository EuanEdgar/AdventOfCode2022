import input from './input.js'

class Range {
  constructor(min, max) {
    this.min = min
    this.max = max
  }

  includes(int) {
    return this.min <= int && this.max >= int
  }

  contains(otherRange) {
    return this.min <= otherRange.min && this.max >= otherRange.max
  }

  overlaps(otherRange) {
    return otherRange.contains(this) || this.includes(otherRange.min) || this.includes(otherRange.max)
  }
}

// Input ranges are of form `x-y`
const rangeFromInput = (input) => {
  const [min, max] = input.split(/-/).map((v) => parseInt(v))
  return new Range(min, max)
}

export const elfRangePairs = input.map((pair) => pair.split(/,/).map(rangeFromInput))

const countOfPairsWithTotalOverlaps = elfRangePairs.reduce((count, [range1, range2]) => {
  if(range1.contains(range2) || range2.contains(range1)) {
    return count + 1
  }
  return count
}, 0)

console.log('Part 1:', countOfPairsWithTotalOverlaps)
