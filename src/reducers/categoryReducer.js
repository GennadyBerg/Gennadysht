import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request";
//import { prepareHeaders } from "./index";

export const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}

export const categoryApi = createApi({
    reducerPath: 'category',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getRootCategories: builder.query({
            query: () => ({
                document: gql`
                query GetCategories{
                    CategoryFind(query: "[{\\"parent\\": null}]") {
                        _id name
                        }
                    }
                `}),
        }),
        getCategoryById: builder.query({
            query: (_id) => ({
                document: gql`
                    query GetCategory($q: String) {
                        CategoryFindOne(query: $q) {
                            _id name
                            parent { _id name }
                            subCategories { _id name }
                            goods { _id name price description 
                                images { url }
                            }
                        }
                    }
                    `,
                variables: { q: JSON.stringify([{ _id }]) }
            }),
        }),
    }),
})

export const { useGetRootCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;

