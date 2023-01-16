import { createSlice } from "@reduxjs/toolkit"
import { v4 } from "uuid";
import { findObjectIndexById } from "../utills";
import { getCartData } from "./cartGoodsReducer";

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
            state = { goods: goods, uniqueId: v4() };
            return state;
        },
        cleanCart(state, action) {
            localStorage.cart = { goods: [] };
            state = { goods: [], uniqueId: v4() };
            return state;
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
    }
})

let cartReducer = cartReducerSlice.reducer;
let actionAddGoodToCart = good =>
    async (dispatch, state) => {
        dispatch(cartReducerSlice.actions.addGood({ good }))
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

let getCart = state => {
    let res = {
        goods: state.cart.goods,
        goodsData: (state.cartData?.goodsData?.payload ?? []),
        uniqueId: state.cart.uniqueId,
    };
    return res;
}


export {
    cartReducer,
    getCart,
    actionAddGoodToCart, actionDeleteGoodFromCart, actionRestoreCart, actionClearCart
};