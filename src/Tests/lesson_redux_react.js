import logo from './logo.svg';
import React, {useState, useEffect, useRef, createElement, Component} from 'react';
import {Router, Route, Link, Redirect, Switch, useParams} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

import './App.scss';

const history = createHistory()
console.log(useParams)

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
const gql = getGql("http://shop-roles.node.ed.asmer.org.ua/graphql");
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

const store = createStore(combineReducers({promise:promiseReducer}), applyMiddleware(thunk))
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

const MyLink = ({activeClassName='activeLink', className='', to, ...props}) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    useEffect(() => 
        history.listen(({pathname}) => setCurrentPath(pathname))
    , [])
    return (
        <Link className={`${className} ${to === currentPath ? activeClassName : ''}`} to={to} {...props}/>
    )
}

const Multiply = () =>{
    const {a,b} = useParams()
    return (
        <pre>
            a * b = {a} * {b} = {+a * +b}
        </pre>
    )
}

const Add = (/*props*/{match:{params:{a,b}}}) => 
<div>
    a + b = {a} + {b} = {+a + +b}
    {/*JSON.stringify(props, null, 4)*/}
    <Multiply />
</div>

const NotFound = () =>
    <div>
        <h1>404 not found</h1>
    </div>

const CatMenuItem = ({cat: {_id, name}}) => 
    <li><MyLink to={`/category/${_id}`}>{name}</MyLink></li>

const CatMenu = ({cats=[]}) =>
    <ul>
        {cats.map(cat => <CatMenuItem cat={cat} />)}
    </ul>

const CCatMenu = connect(state => ({cats: state.promise?.rootCats?.payload || []}), {onLogin: actionFullLogin})(CatMenu)

const CLoginForm = connect(null, {onLogin: actionFullLogin})(LoginForm)

function App() {
    return (
        <Router history = {history}>
            <Provider store={store}>
                <div className="App">
                    <CCatMenu />
                    <LoginForm onLogin={(l, p) => console.log(l,p)} />
                    <CLoginForm />
                    <MyLink to="/" activeClassName='activeLink'>Главная</MyLink>
                    <MyLink to="/aboutus" activeClassName='activeLink'>О нас</MyLink>
                    <MyLink to="/add/2/3" activeClassName='activeLink'>2 + 3</MyLink>
                    <MyLink to="/add/20/50" activeClassName='activeLink'>20 + 50</MyLink>

                    <h1>Этот текст будет всегда в независимости от роутинга</h1>
                    <Switch>
                        <Route path="/" component={Main} exact/>
                        <Route path="/aboutus" component={AboutUs} />
                        <Route path="/add/:a/:b" component={Add} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <h1>Роутинг выше</h1>
                </div>
            </Provider>
        </Router>
    );
}
export default App;
