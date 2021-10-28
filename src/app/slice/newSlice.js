import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import NEWAPI from '../../common/newApi'


export const fetchNew = createAsyncThunk(
    'fetchNew/newReducer',
    async (params, thunkAPI) => {
        const res = await NEWAPI('get', 'news', null)
        thunkAPI.dispatch(changeNews(res.data))
    }
)
const newReducer = createSlice({
    name: 'newReducer',
    initialState: {
        news: null
    },
    reducers: {
        changeNews: (state, action) => {
            state.news = action.payload
        }
    }
})
export const { changeNews } = newReducer.actions
export default newReducer.reducer