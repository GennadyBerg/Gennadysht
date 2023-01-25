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
const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ({ fromPage, pageSize, searchStr = '' }) => {
                let params = createFullQuery(getOrderSearchParams(searchStr), { fromPage, pageSize, sort: { _id: -1 } });
                return {
                    document: gql`
                            query OrderFind($q: String) {
                                OrderFind(query: $q) {
                                    _id total createdAt
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
                variables: { order: { "_id": id, "orderGoods": order } }
            })
        }),
    }),
});


export const { useGetOrdersQuery, useGetOrdersCountQuery, useGetOrderByIdQuery, useAddOrderMutation } = ordersApi;
export { ordersApi };

