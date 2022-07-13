class Node {
  constructor(value) {
    this.id = `Tile-${value}`
    this.value = value
    this.width = 2 * value
    this.next = null
  }
}

class Stack {
  constructor(maxSize) {
    this.top = null
    this.maxSize = maxSize
    this.size = 0
  }

  push(value) {
    const newNode = new Node(value)
    if (!this.top) {
      this.top = newNode
    } else if (!this.isFull()) {
      newNode.next = this.top //Apuntamos al elemento que está en la cima
      this.top = newNode
    } else {
      return new Error('La pila está llena')
    }
    this.size++
    return this
  }

  peek() {
    return this.top
  }

  pop() {
    if (this.size > 0) {
      let topNode = this.top
      this.top = topNode.next
      this.size--
      return topNode
    }
  }

  isFull() {
    return this.size === this.maxSize
  }

  isEmpty() {
    return this.size === 0
  }

  traverse() {
    //Obtener una lista con todos los nodos de la pila
    let currentNode = this.top
    let list = []
    while (currentNode) {
      list.push(currentNode)
      currentNode = currentNode.next
    }
    return list
  }
}

export default Stack
