import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { gql } from "graphql-request";
import { createFullQuery } from '../gql';
//import { prepareHeaders } from "./index";

const getCategorySearchParams = (query, queryExt) => ({ searchStr: query, searchFieldNames: ["name"], queryExt });
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
            query: (withChildren = false) => ({
                document: gql`
                query GetCategories{
                    CategoryFind(query: "[{\\"parent\\": null}]") {
                        _id name ${withChildren ? 'subCategories { _id name } ' : ''}
                        }
                    }
                `}),
        }),
        getCategories: builder.query({
            query: ({ withOwner = false, withChildren = false, withParent = false, queryExt = {}, fromPage, pageSize, searchStr = '' }) => {
                let params = createFullQuery(getCategorySearchParams(searchStr, queryExt), { fromPage, pageSize, sort: { name: 1 } });
                return {
                    document: gql`
                    query GetCategories($q: String){
                        CategoryFind(query: $q) {
                            _id name ${withChildren ? 'subCategories { _id name } ' : ''}
                            ${withParent ? 'parent { _id name } ' : ''}
                            ${withOwner ? 'owner { _id login nick} ' : ''}
                            }
                        }
                `,
                    variables: params
                }
            },
        }),
        getCategoriesCount: builder.query({
            query: ({ searchStr = '', queryExt = {} }) => {
                let params = createFullQuery(getCategorySearchParams(searchStr, queryExt = {}));
                return {
                    document: gql`
                            query CategoriesCount($q: String) { CategoryCount(query: $q) }
                    `,
                    variables: params
                }
            },
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
            invalidatesTags: (result, error, arg) => ([{ type: 'GoodsCount', id: arg._id }])
        }),
    }),
})

export const { useGetRootCategoriesQuery, useGetCategoryByIdQuery, useGetCategoriesQuery, useGetCategoriesCountQuery } = categoryApi;

