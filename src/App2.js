import logo from './logo.svg';
import React, { useState, useEffect, useRef, createElement, Component } from 'react';
import { Router, Route, Link, Redirect, Switch, useParams } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

import { actionAuthLogin, actionAuthLoginThunk, authReducer } from './reducers';
import { CLoginForm } from './Components';


import './App2.css';
import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';

const history = createHistory()
//console.log(useParams)
console.log("TEST!!!!")

// setTimeout(() => history.push('/aboutus'), 5000)
function getGql(url) {
    return function gql(query, vars = undefined) {
        try {
            let fetchSettings =
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        query: query,
                        variables: vars
                    })
            };
            let authToken = window.localStorage.authToken;
            if (authToken) {
                fetchSettings.headers["Authorization"] = `Bearer ${authToken}`;
            }
            return fetch(url, fetchSettings)
                .then(res => {
                    try {
                        if (!res.ok) {
                            throw Error(res.statusText);
                        }
                        return res.json();
                    }
                    catch (error) {
                        throw error;
                    }

                });
        }
        catch (error) {
            throw error;
        }
    }
}
const backendURL = "http://shop-roles.node.ed.asmer.org.ua/"
const gql = getGql(`${backendURL}graphql`);
const actionPromise = (name, promise) => {
    return async (dispatch) => {
        dispatch(actionPending(name)) //сигнализируем redux, что промис начался
        try {
            let payload = await promise //ожидаем промиса
            if (payload && payload.data)
                payload = Object.values(payload.data)[0];
            dispatch(actionFulfilled(name, payload)) //сигнализируем redux, что промис успешно выполнен
            return payload //в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
        }
        catch (error) {
            dispatch(actionRejected(name, error)) //в случае ошибки - сигнализируем redux, что промис несложился
        }
    }
}

const actionPending = (name) => ({ type: 'PROMISE', name: name, status: 'PENDING' });
const actionFulfilled = (name, payload) => ({ type: 'PROMISE', name: name, payload: payload, status: 'FULFILLED' });
const actionRejected = (name, error) => ({ type: 'PROMISE', name: name, error: error, status: 'REJECTED' });
///////////////////////////////////////

const gqlRootCats = () => {
    const catQuery = `query roots {
                            CategoryFind(query: "[{\\"parent\\": null }]") {
                                _id name
                            }}`;
    return gql(catQuery);
}
const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats());

const gqlCategoryFindOne = (_id) => {
    const catQuery = `query CategoryFindOne($q: String) {
            CategoryFindOne(query: $q) {
                _id name
                parent { _id name }
                subCategories { _id name }
                goods { _id name price description 
                    images { url }
                }
            }
        }`;
    return gql(catQuery, { q: JSON.stringify([{ _id }]) });
}
const actionCategoryFindOne = (id) =>
    actionPromise('catFindOne', gqlCategoryFindOne(id));


function promiseReducer(state = {}, action) {                   // диспетчер обработки
    if (action) {
        if (action.type === 'PROMISE') {
            let newState = { ...state };
            newState[action.name] = { status: action.status, payload: action.payload, error: action.error };
            return newState;
        }
    }
    return state;
}

const store = createStore(combineReducers({ promise: promiseReducer, auth: authReducer }), applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

store.dispatch(actionRootCats())

const Main = () =>
    <main>
        <h1>MAIN</h1>
    </main>

const AboutUs = () =>
    <main>
        <h1>ABOUT US</h1>
    </main>

const MyLink = ({ activeClassName = 'activeLink', className = '', to, ...props }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    useEffect(() =>
        history.listen(({ pathname }) => setCurrentPath(pathname))
        , [])
    return (
        <Link className={`${className} ${to === currentPath ? activeClassName : ''}`} to={to} {...props} />
    )
}

const Multiply = () => {
    const { a, b } = useParams()
    return (
        <pre>
            a * b = {a} * {b} = {+a * +b}
        </pre>
    )
}

const Add = (/*props*/{ match: { params: { a, b } } }) =>
    <div>
        a + b = {a} + {b} = {+a + +b}
        {/*JSON.stringify(props, null, 4)*/}
        <Multiply />
    </div>

const NotFound = () =>
    <div>
        <h1>404 not found</h1>
    </div>

const CatMenuItem = ({ cat: { _id, name } }) =>
    <>
        <li><MyLink to={`/category/${_id}`}>{name}</MyLink></li>
        <li><MyLink to={`/testLogin`}>TEST!!!</MyLink></li>
        <li><Link to={`/testLogin`}><Button color="inherit">Logout</Button></Link></li>

    </>

const CatMenu = ({ cats = [] }) =>
    <ul>
        {cats.map(cat => <CatMenuItem cat={cat} />)}
    </ul>

const mapStateToProps = state => ({ cats: state.promise.rootCats?.payload })
// const mapDispatchToProps = {onLogin: actionFullLogin}

// const CCatMenu = connect(mapStateToProps,  mapDispatchToProps)(CatMenu)

const CCatMenu = connect(state => ({ cats: state.promise.rootCats?.payload }))(CatMenu)

// const CLoginForm = connect(null, {onLogin: actionFullLogin})(LoginForm)

const GoodCard = ({ _id, name, price, images = [] }) =>
    <div className='GoodCard'>
        <MyLink to={`/good/${_id}`}>
            <h2>{name}</h2>
            {images && images[0] && <img src={backendURL + images[0].url} />}
            <span>{price}</span>
        </MyLink>
    </div>


const PageCategory = ({ loadData, cat: { name = 'loading', goods = [] } = {} }) => {
    const { _id } = useParams()
    //const dispatch = useDispatch()
    //const dispatch = store.dispatch
    // const cat = useSelector(state => state.promise.catFindOne?.payload)
    useEffect(() => {
        loadData(_id)
        //dispatch(actionCategoryFindOne(_id))
    }, [_id])
    return (
        <div className='PageCategory'>
            <h1>Категория: {name}</h1>
            {goods.map(good => <GoodCard key={good._id} {...good} />)}
        </div>
    )
}

const CPageCategory = connect(state => ({ cat: state.promise.catFindOne?.payload }), { loadData: actionCategoryFindOne })(PageCategory)

export function App2() {
    return (
        <Router history={history}>
            <Provider store={store}>
                <div className="App">
                    <CCatMenu />
                    <Switch>
                        <Route path="/testLogin" component={CLoginForm} />
                        <Route path="/category/:_id" component={CPageCategory} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Provider>
        </Router>
    );
}
export default App2;
