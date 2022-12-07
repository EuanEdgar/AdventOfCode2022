import input from './input.js'

const CONTEXTS = {
  cmd: 'commandline',
  ls: 'ls output'
}

class Entity {
  constructor({ name, directory }) {
    this.name = name
    this.directory = directory
  }
}

export class Directory extends Entity {
  constructor({ contents = {}, ...entityProps }) {
    super(entityProps)
    this.contents = contents
  }

  folder({ name, ...opts }) {
    if(!this.contents[name]) {
      this.contents[name] = new Directory({ name, directory: this, ...opts })
    }
    return this.contents[name]
  }

  file({ name, ...opts }) {
    if(!this.contents[name]) {
      this.contents[name] = new File({ name, directory: this, ...opts })
    }
    return this.contents[name]
  }

  get totalSize() {
    return this._totalSize || (
      this._totalSize = Object.values(this.contents).reduce((sum, entry) => {
        if(entry instanceof File) {
          return sum + entry.size
        }
        return sum + entry.totalSize
      }, 0)
    )
  }
}

export class File extends Entity {
  constructor({ size = 0, ...entityProps }) {
    super(entityProps)
    this.size = size
  }
}

const ROOT = new Directory({ name: 'ROOT'})
let context = CONTEXTS.cmd
let dir = ROOT

const parseCommand = (line, { context, dir }) => {
  const [, cmd, arg] = line.split(/\s/g)

  switch(cmd) {
    case 'cd': {
      if(arg === '/') {
        dir = ROOT
      } else if(arg === '..') {
        dir = dir.directory
      } else {
        dir = dir.folder({ name: arg })
      }
      break
    }
    case 'ls': {
      context = CONTEXTS.ls
      break
    }
  }

  return { context, dir }
}

const parseLsLine = (line, dir) => {
  const [sizeOrType, name] = line.split(/\s/g)

  switch(sizeOrType) {
    case 'dir': {
      dir.folder({ name })
      break
    }
    default: {
      dir.file({ name, size: parseInt(sizeOrType) })
    }
  }
}

input.forEach((line) => {
  if(line.startsWith('$')) {
    context = CONTEXTS.cmd
  }

  switch(context) {
    case CONTEXTS.cmd: {
      ({ context, dir } = parseCommand(line, { context, dir }))
      break
    }
    case CONTEXTS.ls: {
      parseLsLine(line, dir)
      break
    }
  }
})

export default ROOT
