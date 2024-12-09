import { CardInput } from "../CardInput/CardInput";
import { Card } from "../../interfaces";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { clearCards } from "../../store/slice/cardSlice";

interface CardsProps {
  title: string;
  type: 'field' | 'hand';
  cards: (Card | null)[];
}
export const Cards = ({ title, type, cards }: CardsProps) => {
  const dispatch = useAppDispatch();
  const hasContent = cards.some(card => card !== null);
  const handleClearButton = () => {
    dispatch(clearCards({ type }));
  };
  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-2">{title}</h3>
        {
          hasContent && (
            <Button variant="danger" size="sm" onClick={handleClearButton}>Reset</Button>
          )
        }
      </div>
      {
        cards.map((card, index) => (
          <div className="mb-2" key={`${type}-${index}`}>
            <CardInput index={index} type={type} card={card} />
          </div>
        ))
      }
    </>
  );
};
