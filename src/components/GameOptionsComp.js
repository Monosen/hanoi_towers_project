import { Row, Col, Button } from 'react-bootstrap'

const GameOptionsComp = ({ disks, handleDisks, solve, reset }) => {
  const addOrSub = (value) => {
    if (value === -1) {
      if (disks === 1) return

      return handleDisks(disks - 1)
    }

    handleDisks(disks + 1)
  }

  return (
    <Row>
      <Col>
        <span>Discos: {disks}</span>
        <Button onClick={() => addOrSub(1)} variant="outline-secondary">
          +
        </Button>
        <Button onClick={() => addOrSub(-1)} variant="outline-secondary">
          -
        </Button>
      </Col>
      <Col>
        <Button variant="outline-secondary" onClick={reset}>
          Reiniciar
        </Button>
        <Button variant="outline-secondary" onClick={solve}>
          Resolver
        </Button>
      </Col>
    </Row>
  )
}

export default GameOptionsComp
