import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { Cards } from './components/Cards/Cards';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { findFusion } from './utils/fusion';
import { updateCombinations } from './store/slice/combinationSlice';
import { Result } from './components/Result/Result';
import { Card, FusionItem } from './interfaces';
import { prepareCards } from './utils/cards';
import { addCard, clearCards, removeCardsByName } from './store/slice/cardSlice';

function App() {
  const handCards = useAppSelector(state => state.cards.handCards);
  const fieldCards = useAppSelector(state => state.cards.fieldCards);
  const fuses = useAppSelector(state => state.combinations.fuses);
  const equips = useAppSelector(state => state.combinations.equips);
  const dispatch = useAppDispatch();
  const handleFuseButton = (combination: FusionItem) => {
    const cards = prepareCards();
    const card1Find = cards.find(c => c.Name === combination.card1.Name);
    const card2Find = cards.find(c => c.Name === combination.card2.Name);

    if (!card1Find || !card2Find) {
      alert('Error finding cards for fusion');
      return;
    }

    const fusionCardFind = cards.find(c => c.Name === combination.result!.Name);
    if (!fusionCardFind) return;

    const handNames: string[] = [];
    const fieldNames: string[] = [];

    [card1Find, card2Find].forEach(card => {
      const inHand = handCards.some(item => item?.Name === card.Name);
      if (inHand) {
        handNames.push(card.Name);
      } else {
        const inField = fieldCards.some(item => item?.Name === card.Name);
        if (inField) {
          fieldNames.push(card.Name);
        }
      }
    });

    if (handNames.length) {
      dispatch(removeCardsByName({ type: 'hand', cardNames: handNames }));
    }

    if (fieldNames.length) {
      dispatch(removeCardsByName({ type: 'field', cardNames: fieldNames }));
    }

    const index = fieldCards.findIndex((item: Card | null) => item === null);
    if (index !== -1) {
      dispatch(addCard({ index, card: fusionCardFind, type: 'field' }));
    }
  };
  const handleClearAllButton = () => {
    dispatch(clearCards({ type: 'field' }));
    dispatch(clearCards({ type: 'hand' }));
    console.clear();
  }
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
        {
          handCards.some(card => card !== null) || fieldCards.some(card => card !== null) ? (
            <>
              <Row className="mt-2 justify-content-center align-items-center">
                <Button
                  variant="danger"
                  size="sm"
                  className="w-auto"
                  onClick={handleClearAllButton}
                >
                  Reset All
                </Button>
              </Row>
            </>
          ) : null
        }
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
            <Result title="Fusions" combinations={fuses} type='fusion' handleFuseButton={handleFuseButton} />
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
