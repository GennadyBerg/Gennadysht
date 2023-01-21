import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid";
import { history } from "../App";
import { findObjectIndexById } from "../utills";
import { ordersApi } from "./ordersReducer";
//import { clearCartData, getCartData } from "./cartGoodsReducer";

const cartReducerSlice = createSlice({ //promiseReducer
    name: 'cart', //префикс типа наподобие AUTH_
    initialState: {
        goods: []
    },
    reducers: {
        restoreCart(state, action) {
            let goods = localStorage.cart.goods;
            if (!goods) {
                goods = [];
                localStorage.cart = { goods: goods };
            }
            setStateData(state, goods, v4());
            return state;
        },
        cleanCart(state, action) {
            return cleanCartInt(state);
        },
        refreshCart(state, action) {
            state.uniqueId = v4();
            return state;
        },
        addGood(state, action) {
            let { _id, count = 1 } = action.payload.good;
            let goods = state.goods;
            let goodIdx = findObjectIndexById(goods, _id);
            let good;
            if (goodIdx < 0) {
                goodIdx = goods.length;
                good = { _id: _id, count: 0 }
            }
            else {
                good = goods[goodIdx];
            }

            count = good.count + count;
            if (count > 0) {
                good.count = count;
                state.goods[goodIdx] = good;
                state.uniqueId = v4()
            }
            return state;
        },
        deleteGood(state, action) {
            let { _id } = action.payload.good;
            let goods = state.goods;
            let goodIdx = findObjectIndexById(goods, _id);
            if (goodIdx >= 0) {
                state.goods = goods.slice(goodIdx, 1);
                state.uniqueId = v4()
            }
            return state;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(ordersApi.endpoints.addOrder.matchFulfilled,
            (state, { payload }) => {
                cleanCartInt(state);
                let orderId = payload.OrderUpsert._id;
                history.push(`/order/${orderId}`);
            });
    }
})
function cleanCartInt(state) {
    localStorage.cart = { goods: [] };
    setStateData(state, [], v4());
    return state;
}

let cartReducer = cartReducerSlice.reducer;
let actionAddGoodToCart = (good, count = 1) =>
    async (dispatch, state) => {
        dispatch(cartReducerSlice.actions.addGood({ good: { ...good, count } }))
    }

let actionDeleteGoodFromCart = good =>
    async dispatch => {
        dispatch(cartReducerSlice.actions.deleteGood({ good }))
    }

let actionRestoreCart = () =>
    async dispatch => {
        dispatch(cartReducerSlice.actions.restoreCart({}))
    }

let actionClearCart = () =>
    async dispatch => {
        dispatch(cartReducerSlice.actions.cleanCart({}))
    }

/*let actionClearCartData = () =>
    async (dispatch, useState) => {
        let commonState = useState();
        dispatch(cartReducerSlice.actions.cleanCartData({ commonState }))
    }*/

/*let getCart = state => {
    let res = {
        goods: state.cart.goods,
        goodsData: getCartData(state),
        uniqueId: state.cart.uniqueId,
    };
    return res;
}*/

const setStateData = (state, goods, uniqueId = undefined) => {
    if (goods !== undefined)
        state.goods = goods;
    if (uniqueId !== undefined)
        state.uniqueId = uniqueId;
}



export {
    cartReducer, /*getCart,*/
    actionAddGoodToCart, actionDeleteGoodFromCart, actionRestoreCart,
    actionClearCart/*, actionClearCartData*/
};