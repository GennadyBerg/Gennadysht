import { gqlFindOrders } from "../jql/gqlOrders";
import { actionPromise } from "./promiseReducer";

export const actionFindOrders = (fromPage = 0, pageSize = undefined) =>
    actionPromise('orders', gqlFindOrders(fromPage, pageSize));
