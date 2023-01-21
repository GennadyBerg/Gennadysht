import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";
import { createFullQuery } from "../gql";

const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}


const cartGoodsApi = createApi({
    reducerPath: 'cartGoods',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getCartGoods: builder.query({
            query: ({ goods }) => {
                let params = createFullQuery({queryExt: { _id: { "$in": goods.map(g => g._id) } } })
                //{ q: { _id: { "$in": goods.map(g => g._id) } } };
                //let params = JSON.stringify({ q: [{ _id: { "$in": goods.map(g => g._id) } }] });
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
    }),
})
export const { useGetCartGoodsQuery } = cartGoodsApi;
export { cartGoodsApi };
