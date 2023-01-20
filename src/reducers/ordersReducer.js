import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request";
import { createFullQuery } from '../gql';
 
const getOrderSearchParams = query => ({ searchStr: query, searchFieldNames: ["_id"] });
const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}
const getOrdersSearchParams = query => ({ searchStr: query, searchFieldNames: ["_id"] });
const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ({ fromPage, pageSize, searchStr = '' }) => {
                let params = createFullQuery(getOrderSearchParams(searchStr), { fromPage, pageSize });
                return {
                    document: gql`
                            query OrderFind($q: String) {
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
                            }
                `,
                    variables: params
                }
            },
        }),
        getOrdersCount: builder.query({
            query: ({ searchStr = '' }) => {
                let params = createFullQuery(getOrderSearchParams(searchStr));
                return {
                    document: gql`
                            query OrdersCount($q: String) { OrderCount(query: $q) }
                    `,
                    variables: params
                }
            },
        }),
        getOrderById: builder.query({
            query: (_id) => {
                let params = createFullQuery({ queryExt: { _id } });
                return {
                    document: gql`
                            query OrderFindOne($q: String) {
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
                            }
                    `,
                    variables: params
                }
            },
        }),
        addOrder: builder.mutation({
            query: ({ order, id = null }) => ({
                document: gql`
                        mutation OrderUpsert($order: OrderInput) {
                            OrderUpsert(order: $order) {
                                _id
                            } 
                        }
                        `,
                variables: JSON.stringify({ order: { "_id": id, "orderGoods": order } })
            })
        }),
    }),
});

const actionAddOrder = () => {
    return async (dispatch, getState) => {
        let state = getState();
        if (state.cart.goods.length > 0) {
            let order = [];
            for (let good of Object.values(state.cart.goods)) {
                order.push({ good: { _id: good._id }, count: good.count });
            }
            const addOrderMutation = ordersApi.useAddOrderMutation();
            dispatch(addOrderMutation({ order }));
            //dispatch(actionClearCart());
        }
    }
}

export const { useGetOrdersQuery, useGetOrdersCountQuery, useGetOrderByIdQuery } = ordersApi;
export { ordersApi, actionAddOrder };

