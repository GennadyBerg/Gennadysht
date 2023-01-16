import { gqlGoodFind } from "../gql";
import { actionClearCartData } from "./cartReducer";
import { actionPromiseGeneric, createPromiseReducerSlice } from "./promiseReducer";

let actionCartGoodsFindInt = (dispatch, goods) => {
    return dispatch(
        actionGetCartGoods({ _id: { "$in": goods.map(g => g._id) } }));
}

const goodsData = "goodsData";
const actionGetCartGoods = (goodsQuery) => {
    let a = '';
    return actionPromiseCartGoods(goodsData, gqlGoodFind(undefined, undefined, null, goodsQuery));
}

let actionLoadCart = () =>
    async (dispatch, getState) => {
        let state = getState();
        let goods = state.cart.goods;
        if (goods?.length > 0)
            actionCartGoodsFindInt(dispatch, goods);
        else
            dispatch(actionClearCartData());
    }

let getCartData = state => {
    var cartData = state.cartData;
    if (!cartData)
        return [];
    return cartData[goodsData]?.payload ?? [];
}
let clearCartData = state => {
    let res = false;
    let cartData = getCartData(state);
    if (cartData?.length > 0) {
        state.cartData = { [goodsData]: { payload: [] } };
        res = true;
    }
    return res;
}

const cartGoodsReducerSlice = createPromiseReducerSlice('cartData');
const actionPromiseCartGoods = (name, promise) =>
    actionPromiseGeneric(cartGoodsReducerSlice, name, promise);
let cartGoodsReducer = cartGoodsReducerSlice.reducer;
export { cartGoodsReducer, actionLoadCart, getCartData, clearCartData }
