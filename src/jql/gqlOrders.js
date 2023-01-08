import { gql } from "../utills/gql";
import {actionPromise} from "../reducers";
import {actionCartClear} from '../reducers';

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


export const gqlFindOrders = (fromPage, pageSize) => {
    
    let params = { q: `[{}, {\"skip\":[${fromPage * pageSize}], \"limit\":[${pageSize}]}]` };
    const findOrdersQuery = `query OrderFind($q: String) {
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
    return gql(findOrdersQuery, params);
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
