import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from './store.ts';

interface DialogUiState {
    selectedDialogId: string | null;
}

const initialState = { selectedDialogId: null } satisfies DialogUiState as DialogUiState;

const dialogUiSlice = createSlice({
    name: 'dialogUi',
    initialState,
    reducers: {
        selectDialog(state, action: PayloadAction<string | null>) {
            state.selectedDialogId = action.payload;
        },
    },
});

export const { selectDialog } = dialogUiSlice.actions;
export default dialogUiSlice.reducer;
export const useDialogUiSelector = useSelector.withTypes<RootState>();
