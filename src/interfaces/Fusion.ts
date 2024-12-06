import { Card } from './Card'

export interface FusionItem {
    card1: Card;
    card2: Card;
    result: Card | null;
}

export interface FusionList {
    card: number;
    result: number;
}