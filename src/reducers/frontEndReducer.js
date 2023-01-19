import { createSlice } from "@reduxjs/toolkit"
import { goodsApi } from "./goodsReducer";

const frontEndReducerSlice = createSlice({ //promiseReducer
    name: 'frontend', //префикс типа наподобие AUTH_
    initialState: {
        sidebar: {},
        ordersPaging: { fromPage: 0, pageSize: 5 },
        goodsPaging: { fromPage: 0, pageSize: 5 }
    }, //state={} в параметрах
    reducers: {
        setSidebar(state, action) {
            state.sidebar = { opened: action.payload.open };
            return state;
        },
        setOrdersPaging(state, action) {
            state.ordersPaging = { fromPage: action.payload.page.fromPage, pageSize: action.payload.page.pageSize };
            return state;
        },
        setOrdersSearch(state, action) {
            state.ordersSearchStr = action.payload.searchStr;
            return state;
        },
        setGoodsPaging(state, action) {
            state.goodsPaging = { fromPage: action.payload.page.fromPage, pageSize: action.payload.page.pageSize };
            return state;
        },
        setGoodsSearch(state, action) {
            state.goodsSearchStr = action.payload.searchStr;
            return state;
        },
        setCurrentCategory(state, action) {
            setCurrentCategory(state, action.payload._id);
            return state;
        },
        setCurrentGood(state, action) {
            setCurrentGood(state, action.payload._id);
            return state;
        },
    },
    extraReducers: builder =>
        builder.addMatcher(goodsApi.endpoints.getGoodsCount.matchFulfilled,
            (state, { payload }) => {
                state.goods = { goodsCount: { payload: payload.GoodCount } }
            })

})

let frontEndReducer = frontEndReducerSlice.reducer;
let actionSetSidebar = open =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setSidebar({ open }))
    }

let actionSetOrdersPaging = ({ fromPage, pageSize }) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setOrdersPaging({ page: { fromPage, pageSize } }))
    }

let actionSetOrderSearch = (searchStr) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setOrdersSearch({ searchStr }))
    }


let actionSetCurrentCategory = (_id) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setCurrentCategory({ _id }))
    }

let actionSetCurrentGood = (_id) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setCurrentGood({ _id }))
    }

let actionSetGoodsPaging = ({ fromPage, pageSize }) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setGoodsPaging({ page: { fromPage, pageSize } }))
    }

let actionSetGoodsSearch = (searchStr) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setGoodsSearch({ searchStr }))
    }

const currentCategory = 'currentCategory';

const getCurrentCategory = state => {
    let result = state.frontend[currentCategory]?.payload
    return result;
}

const setCurrentCategory = (state, id) => {
    return state[currentCategory] = { payload: id };
}
const currentGood = 'currentGood';

const getCurrentGood = state => {
    let result = state.frontend[currentGood]?.payload
    return result;
}

const setCurrentGood = (state, id) => {
    return state[currentGood] = { payload: id };
}


export { frontEndReducer, actionSetSidebar, actionSetOrdersPaging, actionSetOrderSearch, actionSetGoodsPaging, actionSetGoodsSearch };
export { getCurrentCategory, getCurrentGood, actionSetCurrentCategory, actionSetCurrentGood }
