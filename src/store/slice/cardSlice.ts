import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../interfaces';

interface CardState {
    fieldCards: (Card | null)[];
    handCards: (Card | null)[];
}

const initialState: CardState = {
    handCards: Array(5).fill(null),
    fieldCards: Array(5).fill(null),
};

const compactCards = (cards: (Card | null)[]): (Card | null)[] => {
  const validCards = cards.filter((card): card is Card => card !== null);
  return [...validCards, ...Array(cards.length - validCards.length).fill(null)];
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<{ index: number; card: Card; type: 'field' | 'hand'; }>) => {
            if (action.payload.type === 'field') {
                state.fieldCards[action.payload.index] = action.payload.card;
            } else {
                state.handCards[action.payload.index] = action.payload.card;
            }
        },
        removeCard: (
            state,
            action: PayloadAction<{ type: 'field' | 'hand'; index: number }>
        ) => {
            if (action.payload.type === 'field') {
                state.fieldCards[action.payload.index] = null;
                state.fieldCards = compactCards(state.fieldCards);
            } else {
                state.handCards[action.payload.index] = null;
                state.handCards = compactCards(state.handCards);
            }
        },
        moveCardToField: (state, action: PayloadAction<{ index: number }>) => {
            const isFull = state.fieldCards.every(card => card !== null);
            if (!isFull) {
                const emptyIndex = state.fieldCards.findIndex(card => card === null);
                state.fieldCards[emptyIndex] = state.handCards[action.payload.index];
                state.handCards[action.payload.index] = null;
                state.handCards = compactCards(state.handCards);
            }
        },
        clearCards: (state, action: PayloadAction<{ type: 'field' | 'hand'; }>) => {
            if (action.payload.type === 'field') {
                state.fieldCards = Array(5).fill(null);
            } else {
                state.handCards = Array(5).fill(null);
            }
        },
        removeCardsByName: (
            state,
            action: PayloadAction<{ type: 'field' | 'hand'; cardNames: string[] }>
        ) => {
            const target = action.payload.type === 'field' ? state.fieldCards : state.handCards;
            const namesToRemove = [...action.payload.cardNames];

            const updated = target.map(card => {
                if (!card) return null;

                const index = namesToRemove.indexOf(card.Name);
                if (index !== -1) {
                namesToRemove.splice(index, 1);
                return null;
                }

                return card;
            });

            const validCards = updated.filter((card): card is Card => card !== null);
            const compacted = [...validCards, ...Array(updated.length - validCards.length).fill(null)];

            if (action.payload.type === 'field') {
                state.fieldCards = compacted;
            } else {
                state.handCards = compacted;
            }
        }
    },
});

export const { addCard, removeCard, moveCardToField, clearCards, removeCardsByName } = cardSlice.actions;
export default cardSlice.reducer;