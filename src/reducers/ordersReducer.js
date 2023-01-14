import { gqlFindOrders, gqlOrderFindOne, gqlOrdersCount } from "../gql/gqlOrders";
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

const ordersReducerSlice = createPromiseReducerSlice('orders');
const actionPromiseOrders = (name, promise) =>
    actionPromiseGeneric(ordersReducerSlice, name, promise);

let ordersReducer = ordersReducerSlice.reducer;
export { ordersReducer, actionOrdersCount, actionFindOrders, actionOrderFindOne, getCurrentOrder }