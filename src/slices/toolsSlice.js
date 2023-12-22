import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeCategory: '',
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActiveCategory } = toolsSlice.actions

export default toolsSlice.reducer