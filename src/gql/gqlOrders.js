import { gql } from "../utills/gql";
import { createFullQuery } from "./gqlUtils";

const getOrderSearchParams = query => ({ searchStr: query, searchFieldNames: ["_id"] });

export const gqlOrderFindOne = (_id) => {
    let params = createFullQuery({ queryExt: { _id } });
    const gqlQuery = `query OrderFindOne($q: String) {
        OrderFindOne(query: $q) {
            _id total createdAt
            orderGoods {
                _id price count total createdAt
                good {
                    _id
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

export const gqlAddOrder = (order, id = null) => {
    const orderUpsertQuery = `mutation OrderUpsert($order: OrderInput) {
                            OrderUpsert(order: $order) {
                                _id
                            }
                        }`;
    return gql(orderUpsertQuery, { order: { "_id": id, "orderGoods": order } });
}
