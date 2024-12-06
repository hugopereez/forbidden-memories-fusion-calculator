import { Card } from "../interfaces";
import cards from "../data/cards.json"
import { cardTypes } from './consts/types_and_stars';

export const prepareCards = (): Card[] => {
    return cards;
};

export const getCardType = (card: Card): string | null => {
    const type = cardTypes[card.Type];
    if (type) {
        return type;
    }
    return null;
};

export const getCardById = (id: number): Card | null => {
    const card = cards.find((c) => c.Id === id);
    if (card) {
        return card;
    }
    return null;
}