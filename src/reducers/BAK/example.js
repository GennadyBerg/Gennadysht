import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {  createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request' //npm install
import {graphqlRequestBaseQuery} from '@rtk-query/graphql-request-base-query' //npm install

import {Provider, useDispatch, useSelector} from 'react-redux';

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import {persistReducer , persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';


const prepareHeaders =  (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = getState().auth.token;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
}


export const api = createApi({
    //reducerPath: 'api',
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
                            _id
                            name
                            goods{_id name images{url} price}
                        }
                    }
                    `,
                variables: {q: JSON.stringify([{_id}])}
            }),
        }),
    }),
})

const { useGetRootCategoriesQuery, useGetCategoryByIdQuery } = api
console.log(api)

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql', 
        prepareHeaders
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({login, password}) => ({
                document: gql`
                    query login($login: String, $password: String) {
                        login(login: $login, password: $password) 
                    }
                    `,
                variables: {login, password}})
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
                variables: {q: JSON.stringify([{_id}])}
            }),
            providesTags: (result, error, id) =>  ( [{ type: 'User', id}])
        }),
        setNick: builder.mutation({
            query: ({_id, nick}) => ({
                document: gql`
                    mutation SetNick($_id:String, $nick: String){
                        UserUpsert(user: {_id: $_id, nick: $nick}){
                            _id, nick
                        }
                    }
                `,
                variables: {_id, nick}
            }),
            invalidatesTags: (result, error, arg) => ([{type: 'User', id: arg._id}])
        })
    }),
})

const mySetNick = (_id, nick) =>
    async (dispatch, getState) => {
        await dispatch(actionUpdateUser({_id, nick}))
        await dispatch(actionAboutMe())
    }

const {useLoginMutation, useUserFindQuery, useSetNickMutation} = loginApi

const actionAboutMe = () => 
    async (dispatch, getState) => {
        const auth = getState().auth
        if (auth.token){
            dispatch(loginApi.endpoints.userFind.initiate(auth.payload.sub.id))
        }
    }

function jwtDecode(token) {                         // расщифровки токена авторизации
    if (!token || typeof token != "string")
        return undefined;
    let tokenArr = token.split(".");
    if (tokenArr.length != 3)
        return undefined;
    try {
        let tokenJsonStr = atob(tokenArr[1]);
        let tokenJson = JSON.parse(tokenJsonStr);
        return tokenJson;
    }
    catch (error) {
        return undefined;
    }
}

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        logout(state){ //type - auth/logout
            // state.token = undefined
            return {}
        }
    },
    extraReducers: builder => 
        builder.addMatcher(loginApi.endpoints.login.matchFulfilled,
                          (state, {payload}) => {
                              const tokenPayload = jwtDecode(payload.login)
                              if (tokenPayload){
                                  state.token = payload.login
                                  state.payload = tokenPayload
                              }
                          })    
})

const {logout: actionLogout} = authSlice.actions

const rootReducer = combineReducers({ //combineReducers(
        auth: persistReducer({key: 'auth', storage}, authSlice.reducer),
        [api.reducerPath]:api.reducer,
        [loginApi.reducerPath]:loginApi.reducer
})

// const persistedReducer = 

const store = configureStore({
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
            api.middleware,
            loginApi.middleware],
    reducer: rootReducer
})

const persistor = persistStore(store)

store.subscribe(() => console.log(store.getState()))

const LoginStub = () => {
    const [login, {data, isLoading}] = useLoginMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        login({login: 'admin', password: '123123'}).then(() => dispatch(actionAboutMe()))
    },[])
    
    const myId = useSelector(state => state?.auth?.payload?.sub?.id)
    const {data: aboutMeData} = useUserFindQuery(myId)

    // setTimeout(() => login('admin', '123123'), 2000)
    console.log(data, aboutMeData)
    return (
         <div>{isLoading ? 'грузим' : 'не грузим'}&nbsp;
             {aboutMeData?.UserFindOne?.login} 
             {aboutMeData?.UserFindOne?.nick} 
         </div>   
    )
}

const actionSetNick = (nick) => 
    async (dispatch, getState) => {
        const auth = getState().auth
        if (auth.token){
            dispatch(loginApi.endpoints.setNick.initiate({_id: auth.payload.sub.id, nick}))
        }
    }

const SetNick = () => {
    const [nick, setNickState] = useState('')
    const dispatch = useDispatch()
    return (
        <div>
            <input value={nick} onChange={e => setNickState(e.target.value)}/>
            <button onClick={() => dispatch(actionSetNick(nick))}>Save</button>
        </div>
    )
}

const Aside = () => {

    
    const allCatsHookResult = useGetRootCategoriesQuery()
    const {isLoading, data}       = allCatsHookResult
    console.log(allCatsHookResult)
    return (
        <aside>
            {isLoading && <strong>Loading...</strong>}
            {data && data.CategoryFind && data.CategoryFind.map(cat => <div key={cat._id}>{cat.name}</div>)}
        </aside>
    )
}

const OneCat = () => {
    const oneCatHookResult  = useGetCategoryByIdQuery("62c94990b74e1f5f2ec1a0dc")
    const {isLoading, data}       = oneCatHookResult
    console.log(oneCatHookResult)
    return (
        <div>
            {isLoading && <strong>Loading...</strong>}
            {data && data.CategoryFindOne && 
                <>
                    <h1>{data.CategoryFindOne.name}</h1>
                    {data.CategoryFindOne.goods && data.CategoryFindOne.goods.map(good => <div key={good._id}>{good.name}</div>)}
                </>}
        </div>
    )
}

const LogoutButton = () => {
    const dispatch = useDispatch()
    return (
        <button onClick={() => dispatch(actionLogout())}>Logout</button>
    )
}

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <LogoutButton />
                <LoginStub />
                <SetNick />
                <Aside />
                <OneCat />
            </div>
        </Provider>
    );
}

export default App;
