import { gqlGoodFind } from "../gql";
import { actionPromiseGeneric, createPromiseReducerSlice } from "./promiseReducer";

let actionCartGoodsFindInt = (dispatch, goods) => {
    return dispatch(
        actionGetCartGoods({ _id: { "$in": goods.map(g => g._id) } }));
}

const goodsData="goodsData";
const actionGetCartGoods = (goodsQuery) =>
    actionPromiseCartGoods(goodsData, gqlGoodFind(undefined, undefined, null, goodsQuery));

let actionLoadCart = () =>
    async (dispatch, getState) => {
        let state = getState();
        let goods = state.cart.goods;
        if (goods?.length > 0) {
            actionCartGoodsFindInt(dispatch, goods);
        }
    }

let getCartData = state => {
    return state.cartData[goodsData];
}

const cartGoodsReducerSlice = createPromiseReducerSlice('cartData');
const actionPromiseCartGoods = (name, promise) =>
    actionPromiseGeneric(cartGoodsReducerSlice, name, promise);
let cartGoodsReducer = cartGoodsReducerSlice.reducer;
export { cartGoodsReducer, actionLoadCart, getCartData }
