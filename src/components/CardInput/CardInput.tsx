import { useEffect, useState } from "react";
import { Card } from "../../interfaces";
import { prepareCards, getCardType } from "../../utils/cards";
import { Badge, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { addCard, moveCardToField, removeCard } from "../../store/slice/cardSlice";
import { FaTimes } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

interface CardInputProps {
  index: number;
  type: "field" | "hand";
  card: Card | null;
}

const cards = prepareCards();

export const CardInput = ({ index, type, card }: CardInputProps) => {
  const [cardName, setCardName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Card[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card) {
      setCardName(card.Name);
    }
  }, [card]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setCardName(value);

    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = cards.filter((card) =>
        card.Name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (card: Card) => {
    setCardName(card.Name);
    setSuggestions([]);
    dispatch(addCard({ index, card, type }));
  };

  const removeContent = () => {
    setCardName("");
    dispatch(removeCard({ index, type }));
  };

  const transferCard = () => {
    setCardName("");
    dispatch(moveCardToField({ index }));
  };

  useEffect(() => {
    if (!card) {
      removeContent();
    }
  }, [card])

  return (
    <>
      <InputGroup>
        <Form.Control
          type="text"
          value={cardName}
          onChange={handleInputChange}
          disabled={card !== null}
          style={{ paddingRight: "50px" }} // Add padding to avoid overlap with the badge
        />
        {card && (
          <>
            <Badge bg="secondary" className="d-flex align-items-center">
              ({card.Attack}/{card.Defense}) [{getCardType(card)}]
            </Badge>
            { type === 'hand' && <Button variant="primary" onClick={transferCard}><BiTransfer /></Button> }
            <Button variant="danger" onClick={removeContent}><FaTimes /></Button>
          </>
        )}
      </InputGroup>
      {suggestions.length > 0 && (
        <ListGroup
          style={{
            position: "absolute",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "0.25rem",
          }}
        >
          {suggestions.map((card, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSuggestionClick(card)}
            >
              {card.Name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};
