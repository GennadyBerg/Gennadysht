import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request";
import { useSelector } from 'react-redux';
import { frontEndNames, getCurrentEntity } from '.';
import { createFullQuery } from '../gql';

const getOrderSearchParams = (query, queryExt) => ({ searchStr: query, searchFieldNames: ["_id"], queryExt });
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
            query: ({ owner, fromPage, pageSize, searchStr = '' }) => {
                let queryOrders = GetOwnerQuery(owner);
                let params = createFullQuery(getOrderSearchParams(searchStr, queryOrders), { fromPage, pageSize, sort: { _id: -1 } });
                return {
                    document: gql`
                            query OrderFind($q: String) {
                                OrderFind(query: $q) {
                                    _id total createdAt 
                                    owner {
                                        _id nick login
                                    }
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
            query: ({ owner, searchStr = '' }) => {
                let queryOrders = GetOwnerQuery(owner);
                let params = createFullQuery(getOrderSearchParams(searchStr, queryOrders));
                return {
                    document: gql`
                            query OrdersCount($q: String) { OrderCount(query: $q) }
                    `,
                    variables: params
                }
            },
        }),
        getOrderById: builder.query({
            query: ({ owner, _id }) => {
                let queryOrders = GetOwnerQuery(owner);
                let params = createFullQuery({ queryExt: { ...queryOrders, _id } });
                return {
                    document: gql`
                            query OrderFindOne($q: String) {
                                OrderFindOne(query: $q) {
                                    _id total createdAt 
                                    owner {
                                        _id nick login
                                    }
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
            query: ({ order, id = null }) => (
                {
                    document: gql`
                        mutation OrderUpsert($order: OrderInput) {
                            OrderUpsert(order: $order) {
                                _id
                            } 
                        }
                        `,
                    variables: { order: { "_id": id, "orderGoods": order } }
                }
            )
        }),
    }),
});


export const { useGetOrdersQuery, useGetOrdersCountQuery, useGetOrderByIdQuery, useAddOrderMutation } = ordersApi;
export { ordersApi };

function GetOwnerQuery(owner) {
    return owner?._id && !owner.isAdminRole ? { ___owner: { $in: [owner._id] } } : {};
}

