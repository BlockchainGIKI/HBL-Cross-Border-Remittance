import { createSlice } from '@reduxjs/toolkit';

export const keySlice = createSlice({
    name: 'key',
    initialState: {
        value: null
    },
    reducers: {
        setKey: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setKey } = keySlice.actions

export default keySlice.reducer

export const selectKey = state => state.key.value
