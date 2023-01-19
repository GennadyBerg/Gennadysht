import { gqlFindOrders, gqlOrderFindOne, gqlOrdersCount, gqlAddOrder } from "../gql/gqlOrders";
import { actionClearCart } from "./cartReducer";

import { actionPromiseGeneric, createPromiseReducerSlice } from "./promiseReducer";

const actionFindOrders = (fromPage = 0, pageSize = undefined, query = null) =>
    actionPromiseOrders('orders', gqlFindOrders(fromPage, pageSize, query));

const actionOrdersCount = (query = null) =>
    actionPromiseOrders('ordersCount', gqlOrdersCount(query));

const currentOrder = 'currentOrder';
const actionOrderFindOne = (id) =>
    actionPromiseOrders(currentOrder, gqlOrderFindOne(id));
const getCurrentOrder = state => (
    state.orders[currentOrder]?.payload
)
const actionPlaceOrder = () => {
    return async (dispatch, getState) => {
        let state = getState();
        if (state.cart.goods.length > 0) {
            let order = [];
            for (let good of Object.values(state.cart.goods)) {
                order.push({ good: { _id: good._id }, count: good.count });
            }
            dispatch(actionPromiseOrders('placedOrderInfo', gqlAddOrder(order)));
            dispatch(actionClearCart());
        }
    }
}


const ordersReducerSlice = createPromiseReducerSlice('orders');
const actionPromiseOrders = (name, promise) =>
    actionPromiseGeneric(ordersReducerSlice, name, promise);

let ordersReducer = ordersReducerSlice.reducer;
export { ordersReducer, actionOrdersCount, actionFindOrders, actionOrderFindOne, actionPlaceOrder, getCurrentOrder }