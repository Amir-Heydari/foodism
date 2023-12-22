import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    categories: [],
}



export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        Categories: (state, action) => {
            state.categories = action.payload
        },
    },
})

export const { Categories } = dataSlice.actions

export default dataSlice.reducer