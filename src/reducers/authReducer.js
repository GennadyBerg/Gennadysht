import { gql } from "graphql-request";
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query' //npm install
import { jwtDecode } from "../utills";
import { createSlice } from "@reduxjs/toolkit";
import { history } from "../App";
//import { prepareHeaders } from "./index";

export const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}

export const loginApi = createApi({
    reducerPath: "authApi",
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql',
        prepareHeaders
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ login, password }) => ({
                document: gql`
                    query login($login: String, $password: String) {
                        login(login: $login, password: $password) 
                    }
                    `,
                variables: { login, password }
            })
        }),
        userFind: builder.query({
            query: (_id) => ({
                document: gql`
                    query UserFind($q: String) {
                        UserFindOne(query: $q){
                            _id login nick avatar {url} createdAt
                        } 
                    }
                    `,
                variables: { q: JSON.stringify([{ _id }]) }
            }),
            providesTags: (result, error, id) => ([{ type: 'User', id }])
        }),
        setNick: builder.mutation({
            query: ({ _id, nick }) => ({
                document: gql`
                    mutation SetNick($_id:String, $nick: String){
                        UserUpsert(user: {_id: $_id, nick: $nick}){
                            _id, nick
                        }
                    }
                `,
                variables: { _id, nick }
            }),
            invalidatesTags: (result, error, arg) => ([{ type: 'User', id: arg._id }])
        })
    }),
})

export let authReducerPath = 'auth';
const authSlice = createSlice({
    name: authReducerPath,
    initialState: {},
    reducers: {
        logout(state) { //type - auth/logout
            // state.token = undefined
            history.push('/');
            return {}
        }
    },
    extraReducers: builder =>
        builder.addMatcher(loginApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                const tokenPayload = jwtDecode(payload.login);
                if (tokenPayload) {
                    state.token = payload.login;
                    state.payload = tokenPayload;
                    history.push('/');
                }
            })
})

const { logout: actionAuthLogout } = authSlice.actions;
let authApiReducer = loginApi.reducer;
let authReducer = authSlice.reducer;
let authApiReducerPath = loginApi.reducerPath;

export const { useLoginMutation } = loginApi;
export { authApiReducer, authReducer, authApiReducerPath, actionAuthLogout }

