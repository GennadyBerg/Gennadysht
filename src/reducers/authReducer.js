import { gql } from "graphql-request";
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query' //npm install
import { jwtDecode } from "../utills";
import { createSlice, current } from "@reduxjs/toolkit";
import { history } from "../App";
import { UserEntity } from "../Entities";
import { createFullQuery } from "../gql";
//import { prepareHeaders } from "./index";

const getUsersSearchParams = (searchStr, queryExt) => (
    {
        searchStr: searchStr,
        searchFieldNames: ["nick", "login"],
        queryExt
    });

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
                            _id login nick acl avatar {_id url} createdAt
                        } 
                    }
                    `,
                variables: { q: JSON.stringify([{ _id }]) }
            }),
            providesTags: (result, error, id) => ([{ type: 'User', id }])
        }),
        saveUser: builder.mutation({
            query: ({ user }) => ({
                document: gql`
                            mutation UserUpsert($user: UserInput) {
                                UserUpsert(user: $user) {
                                    _id
                                }
                            }
                        `,
                variables: { user }
            }),
            invalidatesTags: (result, error, arg) => ([{ type: 'User', id: arg._id }])
        }),
        getUsers: builder.query({
            query: ({ fromPage, pageSize, searchStr = '' }) => {
                let params = createFullQuery(getUsersSearchParams(searchStr), { fromPage, pageSize, sort: { _id: -1 } });
                return {
                    document: gql`
                        query UserFind($q: String) {
                            UserFind(query: $q){
                                _id login nick acl avatar {_id url} createdAt
                            } 
                        }                
                    `,
                    variables: params
                }
            },
        }),
        getUsersCount: builder.query({
            query: ({ searchStr = '' }) => {
                let params = createFullQuery(getUsersSearchParams(searchStr));
                return {
                    document: gql`
                            query UsersCount($q: String) { UserCount(query: $q) }
                    `,
                    variables: params
                }
            },
        }),

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
    extraReducers: builder => {
        builder.addMatcher(loginApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                const tokenPayload = jwtDecode(payload.login);
                if (tokenPayload) {
                    state.token = payload.login;
                    state.payload = tokenPayload;
                    state.currentUser = { _id: tokenPayload.sub.id };
                    history.push('/');
                }
            });
        builder.addMatcher(loginApi.endpoints.userFind.matchFulfilled,
            (state, { payload }) => {
                let retrievedUser = payload?.UserFindOne;
                if (retrievedUser?._id === state.currentUser?._id)
                    state.currentUser = retrievedUser;
            });
        builder.addMatcher(loginApi.endpoints.saveUser.matchFulfilled,
            (state, { payload }) => {
                let a = '';
                let b = '';
            });
        builder.addMatcher(loginApi.endpoints.saveUser.matchRejected,
            (state, data) => {
                let a = '';
                let b = '';
            });
    }
})

const actionAboutMe = () =>
    async (dispatch, getState) => {
        const auth = getState().auth
        if (auth.token) {
            dispatch(loginApi.endpoints.userFind.initiate(auth.currentUser._id))
        }
    }

const { logout: actionAuthLogout } = authSlice.actions;
let authApiReducer = loginApi.reducer;
let authReducer = authSlice.reducer;
let authApiReducerPath = loginApi.reducerPath;

export const { useLoginMutation, useUserFindQuery, useSaveUserMutation, useGetUsersQuery, useGetUsersCountQuery } = loginApi;
export { authApiReducer, authReducer, authApiReducerPath, actionAuthLogout, actionAboutMe }

