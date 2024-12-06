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
        removeCard: (state, action: PayloadAction<{ type: 'field' | 'hand'; index: number; }>) => {
            if (action.payload.type === 'field') {
                state.fieldCards[action.payload.index] = null;
            } else {
                state.handCards[action.payload.index] = null;
            }
        },
        moveCardToField: (state, action: PayloadAction<{ index: number; }>) => {
            const isFull = state.fieldCards.every(card => card !== null);
            if (!isFull) {
                const emptyIndex = state.fieldCards.findIndex(card => card === null);
                state.fieldCards[emptyIndex] = state.handCards[action.payload.index];
                state.handCards[action.payload.index] = null;
                console.log('state.fieldCards', state.fieldCards)
            }
        }
    },
});

export const { addCard, removeCard, moveCardToField } = cardSlice.actions;
export default cardSlice.reducer;