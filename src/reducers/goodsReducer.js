import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request";
import { createFullQuery } from '../gql';
//import { prepareHeaders } from "./index";

export const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}
const getGoodsSearchParams = (searchStr, queryExt) => (
    {
        searchStr: searchStr,
        searchFieldNames: ["name", "description"],
        queryExt
    });

export const goodsApi = createApi({
    reducerPath: 'goods',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getGoods: builder.query({
            query: ({ fromPage, pageSize, searchStr = '', queryExt = {} }) => {
                let params = createFullQuery(
                    getGoodsSearchParams(searchStr, queryExt),
                    { fromPage, pageSize });
                return {
                    document: gql`
                        query GoodFind($q: String) {
                            GoodFind(query: $q) {
                                _id name  price description
                                images { url }
                            }
                        }
                `,
                    variables: params
                }
            },
        }),
        getGoodsCount: builder.query({
            query: ({ searchStr = '', queryExt = {} }) => {
                let params = createFullQuery(
                    getGoodsSearchParams(searchStr, queryExt));
                return {
                    document: gql`
                        query GoodsCount($q: String) { GoodCount(query: $q) }
                    `,
                    variables: params
                }
            },
            providesTags: (result, error, id) => ([{ type: 'GoodsCount', id }]),
        }),
        getGoodById: builder.query({
            query: (_id) => {
                let params = createFullQuery({ searchStr: _id, searchFieldNames: ["_id"] });
                return {
                    document: gql`
                        query GoodFindOne($q: String) {
                            GoodFindOne(query: $q) {
                                _id name  price description
                                images { url }
                            }
                        }
                    `,
                    variables: params
                }
            },
        }),
    }),
})

export const { useGetGoodsQuery, useGetGoodsCountQuery, useGetGoodByIdQuery } = goodsApi;

