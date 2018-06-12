function createTypes(prefix, ...args) {
  return args.reduce((types, type) => {
    ;[].concat(type).map(v => (types[v] = prefix + v))
    return types
  }, {})
}

function async(type) {
  return [`${type}_REQUEST`, `${type}_SUCCESS`, `${type}_FAILED`]
}

export { createTypes, async }
