import { CardInput } from "../CardInput/CardInput";
import { Card } from "../../interfaces";

interface CardsProps {
  title: string;
  type: 'field' | 'hand';
  cards: (Card | null)[];
}
export const Cards = ({ title, type, cards }: CardsProps) => {
  return (
    <>
      <h3>{title}</h3>
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
