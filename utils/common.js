exports.uniteObjects = (a, b) => [...Object.keys(a), ...Object.keys(b)]
  .reduce((result, key) => {
    if (!a[key] || !b[key]) return { ...result, [key]: (a[key] || b[key]) }
    return { ...result, [key]: this.uniteObjects(a[key], b[key]) }
  }, {})

exports.isArraysEqual = (a, b) => {
  if (a.length !== b.length) return false
  const sortedA = a.sort()
  const sortedB = b.sort()

  return sortedA.reduce((result, _, i) => {
    return sortedA[i] === sortedB[i] ? result : false
  }, true)
}
