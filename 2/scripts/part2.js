import input from './input.js'

const plays = input.map((row) => row.split(/\s/))

const rock = 1
const paper = 2
const scisors = 3

const caseKey = {
  A: {
    win: paper,
    draw: rock,
    lose: scisors,
  },
  B: {
    win: scisors,
    draw: paper,
    lose: rock,
  },
  C: {
    win: rock,
    draw: scisors,
    lose: paper,
  }
}

// Get score for played piece based on desired result, add scores for win/draw/loss
const score = plays.reduce((score, [foe, result]) => {
  switch(result) {
    case 'X': {
      return caseKey[foe].lose + score
    }
    case 'Y': {
      return caseKey[foe].draw + 3 + score
    }
    case 'Z': {
      return caseKey[foe].win + 6 + score
    }
  }
}, 0)

console.log(score)
