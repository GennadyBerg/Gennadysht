import { createSlice } from "@reduxjs/toolkit"

const frontEndReducerSlice = createSlice({ //promiseReducer
    name: 'frontend', //префикс типа наподобие AUTH_
    initialState: { sidebar: {}, ordersPaging: { fromPage: 0, pageSize: 5 } }, //state={} в параметрах
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
        }
    }
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

let actionSetOrderSearch = ({ searchStr }) =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setOrdersPaging({ searchStr }))
    }


export { frontEndReducer, actionSetSidebar, actionSetOrdersPaging, actionSetOrderSearch };