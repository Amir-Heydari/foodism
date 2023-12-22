import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../src/slices/dataSlice'
import toolsReducer from '../src/slices/toolsSlice'
export const store = configureStore({
    reducer: {
        data: dataReducer,
        tools: toolsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})