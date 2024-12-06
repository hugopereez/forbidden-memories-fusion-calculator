import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { Cards } from './components/Cards/Cards';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { findFusion } from './utils/fusion';
import { updateCombinations } from './store/slice/combinationSlice';
import { Result } from './components/Result/Result';

function App() {
  const handCards = useAppSelector(state => state.cards.handCards);
  const fieldCards = useAppSelector(state => state.cards.fieldCards);
  const fuses = useAppSelector(state => state.combinations.fuses);
  const equips = useAppSelector(state => state.combinations.equips);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const combinations = findFusion(handCards, fieldCards);
    dispatch(updateCombinations(combinations));
  }, [handCards, fieldCards])
  return (
    <>
      <Container>
        <div className="header d-flex justify-content-center align-items-center">
          <h1>Fusion Calculator</h1>
        </div>
        <Row className="mt-2 justify-content-center align-items-center">
          <Col xs={6}>
            <Badge bg="secondary">Fusions: {fuses.length}</Badge>
          </Col>
          <Col xs={6}>
            <Badge bg="secondary">Equips: {equips.length}</Badge>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <Cards title="Hand Cards" type="hand" cards={handCards}/>
          </Col>
          <Col sm={12} md={6}>
            <Cards title="Field Cards" type="field" cards={fieldCards} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={12} md={6}>
            <Result title="Fusions" combinations={fuses} type='fusion' />
          </Col>
          <Col sm={12} md={6}>
            <Result title="Equips" combinations={equips} type='equip' />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
