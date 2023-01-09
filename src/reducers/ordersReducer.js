import { gqlFindOrders, gqlOrdersCount } from "../jql/gqlOrders";
import { actionPromise } from "./promiseReducer";

export const actionFindOrders = (fromPage = 0, pageSize = undefined, query = null) =>
    actionPromise('orders', gqlFindOrders(fromPage, pageSize, query));

export const actionOrdersCount = (query = null) =>
    actionPromise('ordersCount', gqlOrdersCount(query));
