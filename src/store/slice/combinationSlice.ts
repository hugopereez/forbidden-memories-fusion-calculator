import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Equip, FusionItem } from '../../interfaces';

interface CombinationState {
    fuses: FusionItem[];
    equips: Equip[];
}

const initialState: CombinationState = {
    fuses: [],
    equips: [],
};

const combinationSlice = createSlice({
    name: 'combinations',
    initialState,
    reducers: {
        updateCombinations: (state, action: PayloadAction<{ fuses: FusionItem[], equips: Equip[] }>) => {
            state.fuses = action.payload.fuses;
            state.equips = action.payload.equips;
        }
    },
});

export const { updateCombinations } = combinationSlice.actions;
export default combinationSlice.reducer;