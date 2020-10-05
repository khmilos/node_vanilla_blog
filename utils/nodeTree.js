exports.traverse = (node, nodePathes, entities = {}) => {
  if (nodePathes.length === 0) return { node, entities }

  if (node[nodePathes[0]]) {
    const newNode = node[nodePathes[0]]
    const newNodePathes = nodePathes.filter((x, i) => i !== 0)
    return this.traverse(newNode, newNodePathes, entities)
  }

  const entitiesKeys = Object.keys(node).filter((key) => /^:.*$/.test(key))
  if (entitiesKeys.length < 0) return { node: null, entities: null }

  const newNodePathes = nodePathes.filter((x, i) => i !== 0)
  const subtrees = entitiesKeys
    .map((key) => {
      const newNode = node[key]
      const newEntities = { ...entities, [key.replace(':', '')]: nodePathes[0] }
      return this.traverse(newNode, newNodePathes, newEntities)
    })
    .filter((subtree) => subtree.node !== null)

  if (subtrees.length === 0) return { node: null, entities: null }
  return subtrees[0]
}
