import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        value: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAccount } = accountSlice.actions

export default accountSlice.reducer