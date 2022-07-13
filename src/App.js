import React, { useEffect, useState } from 'react'
import GameOptionsComp from './components/GameOptionsComp'
import TowerComp from './components/TowerComp'
import WinMessageComp from './components/WinMessageComp'
import Tower from './utils/Tower'
import './App.css'

const App = () => {
  //Contar el numero de movimientos
  const [moveCount, setMoveCount] = useState(0)
  //El disco que se está movimiendo
  const [dragTile, setDragTile] = useState()
  //Los discos para la torre principal
  const [disks, setDisks] = useState(3)
  //Intervalo para el movimiento de los discos
  const [timeInterval, setTimeInterval] = useState(null)

  //Los discos de cada torre (1, 2, 3)
  const [tiles, setTiles] = useState([])
  const [tilesTwo, setTilesTwo] = useState([])
  const [tilesThree, setTilesThree] = useState([])

  //Las 3 torres (columnas)
  let [towerOne, setTowerOne] = useState(new Tower())
  let [towerTwo, setTowerTwo] = useState(new Tower())
  let [towerThree, setTowerThree] = useState(new Tower())

  const towers = {
    1: {
      tower: towerOne
    },
    2: {
      tower: towerTwo
    },
    3: {
      tower: towerThree
    }
  }

  useEffect(() => {
    //Resetear las torres
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Actualizar todos los discos de las torres
  //Esta actualización se hará con cada movimiento de las torres
  useEffect(() => {
    setTiles(towerOne.stack.traverse())
  }, [towerOne, disks])

  useEffect(() => {
    setTilesTwo(towerTwo.stack.traverse())
  }, [towerTwo])

  useEffect(() => {
    setTilesThree(towerThree.stack.traverse())
  }, [towerThree])

  const reset = () => {
    //COMPLETAR
    // resetar los movimientos
    setMoveCount(0)

    //setTowerOne(new Tower())
    setTowerTwo(new Tower())
    setTowerThree(new Tower())

    handleDisks(3)

    updateTiles()

    clearInterval(timeInterval)
  }

  const handleDrag = (e, tile, id) => {
    //Funcion que se lanza cada vez que movemos un disco que se encuentra en la parte superior de una torre
    const dragTile = { tile, towerId: id }
    if (towers[id].tower.stack.top === dragTile.tile) {
      setDragTile(dragTile)
    } else {
      e.preventDefault()
    }
  }

  const handleDrop = (e) => {
    //Funcion que se lanza cada vez que un disco se deja en una nueva torre
    const dropColumn = e.currentTarget.id //ID de la columna de destino
    let source = towers[dragTile.towerId].tower //Torre de origen
    let destination = towers[dropColumn].tower //Torre de destino

    const goodMove = source.moveTopTo(destination) //Mover el disco desde la torre de origen al destino
    if (goodMove) {
      //Si es un movimiento valido -> incrementar los movimientos
      setMoveCount((prevState) => prevState + 1) //Actualizar los movimientos
    }

    updateTiles()
  }

  const incrementMoveCount = () => {
    setMoveCount((prev) => prev + 1)
  }

  const solve = () => {
    //COMPLETAR

    //Resolver el juego usando el generador
    let solution = new Tower().moveDisks(disks, towerOne, towerThree, towerTwo)
    // Añadir el intervalo para que se muevan los discos
    setTimeInterval(
      setInterval(() => {
        if (solution.next().done) {
          clearInterval(timeInterval)
        } else {
          incrementMoveCount()
          updateTiles()
        }
      }, 1000)
    )
  }

  // aumentar o disminuir el numero de discos
  const handleDisks = (val) => {
    setDisks(val)

    for (let i = disks; i > 0; i--) {
      towerOne.stack.pop()
    }

    for (let i = val; i > 0; i--) {
      towerOne.add(i)
    }
  }

  const updateTiles = () => {
    setTiles(towerOne.stack.traverse())
    setTilesTwo(towerTwo.stack.traverse())
    setTilesThree(towerThree.stack.traverse())
  }

  const winCondition = tilesThree.length === disks //COMPLETAR

  return (
    <>
      <div className="container">
        <GameOptionsComp
          disks={disks}
          handleDisks={handleDisks}
          solve={solve}
          reset={reset}
        />
        <div className="content">
          <TowerComp
            id={1}
            disks={tiles}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={2}
            disks={tilesTwo}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          <TowerComp
            id={3}
            disks={tilesThree}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        </div>
        {winCondition && <WinMessageComp moveCount={moveCount} />}
        Movimientos: {moveCount}
      </div>
    </>
  )
}

export default App
