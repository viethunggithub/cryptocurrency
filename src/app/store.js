import { configureStore } from '@reduxjs/toolkit'
import coin from './slice/coinSlice'
import news from './slice/newSlice'

export default configureStore({
    reducer: {
        coin,
        news
    }
})