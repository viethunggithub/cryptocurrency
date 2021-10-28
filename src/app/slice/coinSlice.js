import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import COINAPI from '../../common/coinApi'


export const fetchCoin = createAsyncThunk(
    'fetchCoin/coinReducer',
    async (params, thunkAPI) => {
        const res = await COINAPI('get', 'coins?limit=100', null)
        thunkAPI.dispatch(changeCoins(res.data.data))
    }
)
export const fetchCoinItem = createAsyncThunk(
    'fetchCoinItem/coinReducer',
    async (coinId, thunkAPI) => {
        const res = await COINAPI('get', `coin/${coinId}`, null)
        thunkAPI.dispatch(changeCoin(res.data.data))
    }
)
export const fetchCoinHistory = createAsyncThunk(
    'fetchCoinHistory/coinReducer',
    async (params, thunkAPI) => {
        const res = await COINAPI('get', `coin/${params.coinId}/history/${params.timePeriod}`, null)
        thunkAPI.dispatch(changeCoinHistory(res.data.data))
    }
)
export const fetchExchange = createAsyncThunk(
    'fetchExchange/coinReducer',
    async (params, thunkAPI) => {
        const res = await COINAPI('get', 'exchanges', null)
        thunkAPI.dispatch(changeExchange(res.data.data))
    }
)
const coinReducer = createSlice({
    name: 'coinReducer',
    initialState: {
        coins: null,
        coin: null,
        coinHistory: null,
        exchange: null
    },
    reducers: {
        changeCoins: (state, action) => {
            state.coins = action.payload
        },
        changeCoin: (state, action) => {
            state.coin = action.payload
        },
        changeCoinHistory: (state, action) => {
            state.coinHistory = action.payload
        },
        changeExchange: (state, action) => {
            state.exchange = action.payload
        },

    }
})
export const { changeCoins, changeCoin, changeCoinHistory, changeExchange } = coinReducer.actions
export default coinReducer.reducer