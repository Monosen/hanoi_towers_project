import Stack from './Stack'

class Tower {
  constructor() {
    //¿Cuáles son las propiedades/atributos?
    this.stack = new Stack() //Almacen de discos
  }

  add(disk) {
    if (this.stack.isEmpty() || disk < this.stack.top.value) {
      this.stack.push(disk)
    }
  }

  moveTopTo(destinationTower) {
    //mover el disco que se encuentra en top
    //hacia la torre destino
    if (this.stack.top !== null) {
      if (destinationTower.stack.top?.value < this.stack.top.value) return
      let disk = this.stack.top.value
      this.stack.pop() //Quitamos el disco que se encuentra en top
      destinationTower.add(disk)
    }
  }

  *moveDisks(n, origin, destination, aux) {
    if (n === 1) {
      yield origin.moveTopTo(destination)
    } else {
      yield* this.moveDisks(n - 1, origin, aux, destination)
      yield origin.moveTopTo(destination)
      yield* this.moveDisks(n - 1, aux, destination, origin)
    }
  }
}

export default Tower
