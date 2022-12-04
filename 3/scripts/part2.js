import input from './input.js'

import { getPriority } from './part1.js'

const backpacks = input.map((s) => s.split(''))

const GROUP_SIZE = 3
const groupedBackpacks = backpacks.reduce((groups, pack) => {
  let currentGroup = groups[groups.length - 1]
  if(currentGroup.length === GROUP_SIZE) {
    groups.push([])
    currentGroup = groups[groups.length - 1]
  }
  currentGroup.push(pack)
  return groups
}, [[]])

const badgeIdentifiers = groupedBackpacks.map(([p1, p2, p3]) => (
  p1.find((itemIdent) => (
    p2.find((itemIdent2) => (
      itemIdent === itemIdent2 && p3.find((itemIdent3) => (
        itemIdent === itemIdent3
      ))
    ))
  ))
))

const totalBadgePriority = badgeIdentifiers.reduce((sum, ident) => sum + getPriority(ident), 0)

console.log('Part 2:', totalBadgePriority)
