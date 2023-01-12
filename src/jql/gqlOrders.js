import { gql } from "../utills/gql";
import { actionPromise } from "../reducers";
import { actionCartClear } from '../reducers';
import { createFullQuery } from "./jqlUtils";

const orderUpsert = (order, id = null) => {
    const orderUpsertQuery = `mutation OrderUpsert($order: OrderInput) {
                            OrderUpsert(order: $order) {
                                _id
                            }
                        }`;
    return gql(orderUpsertQuery, { order: { "_id": id, "orderGoods": order } });
}
export const actionOrderUpsert = (order, id) =>
    actionPromise('orderUpsert', orderUpsert(order, id));

const orderFullUpsert = (then) => {
    return async (dispatch, getState) => {
        let state = getState();
        let order = [];
        for (let cartItem of Object.values(state.cartReducer)) {
            //{count: 3, good: {_id: "xxxx" }}
            order.push({ good: { _id: cartItem.good._id }, count: cartItem.count });
        }
        if (order.length > 0) {
            //dispatch возвращает то, что вернул thunk, возвращаемый actionLogin, а там промис, 
            //так как actionPromise возвращает асинхронную функцию
            let promiseResult = orderUpsert(order);
            let res = await promiseResult;
            if (res && res.errors && res.errors.length > 0) {
                throw res.errors[0];
            }
            dispatch(actionCartClear());
        }
        if (then)
            then();
        //проверьте что token - строка и отдайте его в actionAuthLogin
    }
}
export const actionOrderFullUpsert = (then) =>
    actionPromise('orderUpsert', orderFullUpsert(then));


const getOrderSearchParams = query => ({ searchStr: query, searchFieldNames: ["_id"] });

export const gqlOrderFindOne = (_id) => {
    let params = createFullQuery({ queryExt: { _id } });
    const gqlQuery = `query OrderFindOne($q: String) {
        OrderFindOne(query: $q) {
            _id total createdAt
            orderGoods {
                _id price count total createdAt
                good {
                    name 
                    images { url }
                }
            }
        }
        }`;
    return gql(gqlQuery, params);
}

export const gqlFindOrders = (fromPage, pageSize, query = '') => {
    let params = createFullQuery(getOrderSearchParams(query), { fromPage, pageSize });
    const gqlQuery = `query OrderFind($q: String) {
                            OrderFind(query: $q) {
                                _id total
                                orderGoods {
                                    _id price count total createdAt
                                    good {
                                        name 
                                        images { url }
                                    }
                                }
                            }
                            }`;
    return gql(gqlQuery, params);
}

export const gqlOrdersCount = (query = '') => {
    let params = createFullQuery(getOrderSearchParams(query));
    const catQuery = `query OrdersCount($q: String) { OrderCount(query: $q) }`;
    return gql(catQuery, params);
}

/*
    const gqlFindOrders = (fromPage, pageSize) => {
        const findOrdersQuery = `query OrderFind {
                                OrderFind(query: "[{}]") {
                                    _id total
                                    orderGoods {
                                        _id price count total createdAt
                                        good {
                                            name 
                                            images { url }
                                        }
                                    }
                                }
                                }`;
        return gql(findOrdersQuery);
    }
*/
