import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, useParams } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect, useSelector } from 'react-redux';
import './App.css';
import { authReducer, promiseReducer, actionAuthLogin } from './reducers';
import { CLoginForm, GoodExample, GoodsList, goodsExample, Category, exampleCategory, OrderGood, exampleOrderGood, Order, exampleOrder, OrderList, exampleOrderList, exampleOrderGoodsList, OrderGoodsList } from "./Components";
import { MainAppBar } from './Components';
import { CLogout } from './Components';
import { Sidebar } from './Components/Sidebar';
import thunk from 'redux-thunk';


export const store = createStore(combineReducers({ promise: promiseReducer, auth: authReducer }), applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()))



export const history = createHistory()
console.log(useParams)

//store.dispatch(actionRootCats())
//store.dispatch(actionAuthLogin(localStorage.authToken));


/*
const CCatMenu = connect(state => ({ cats: state.promise?.rootCats?.payload || [] }), { onLogin: actionFullLogin })(CatMenu)
*/

const NotFound = () =>
  <div>
    <h1>404 not found</h1>
  </div>

const Test = () => {
  let state = useSelector(state => state);
  let stateAuth = state.auth;
  let [auth, setAuth] = useState('');
  if (stateAuth != auth) {
    auth = auth;
  }
  return <div />
}

const Main = () =>
  <div>
    <h1>Main page</h1>
  </div>


store.dispatch(actionAuthLogin(localStorage.authToken));
console.log(performance.now())

function App() {

  return (
    <>
      <Router history={history}>
        <Provider store={store}>
          <Test />
          <div className="App">
            <MainAppBar />
            <Sidebar menuComponent={() => <div>TEST!!!!!!</div>} />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/login" component={CLoginForm} />
              <Route path="/logout" component={CLogout} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Provider>
      </Router>
    </>

  );
}
{/*    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>
*/}

{/*<Route path="/" component={Main} exact />*/ }
{/*<CCatMenu />
              <Route path="*" component={NotFound} />
            <LoginForm onLogin={(l, p) => console.log(l, p)} />
            <CLoginForm />
            <MyLink to="/" activeClassName='activeLink'>Главная</MyLink>
            <MyLink to="/aboutus" activeClassName='activeLink'>О нас</MyLink>
            <MyLink to="/add/2/3" activeClassName='activeLink'>2 + 3</MyLink>
            <MyLink to="/add/20/50" activeClassName='activeLink'>20 + 50</MyLink>

            <h1>Этот текст будет всегда в независимости от роутинга</h1>
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/aboutus" component={AboutUs} />
              <Route path="/add/:a/:b" component={Add} />
              <Route path="*" component={NotFound} />
            </Switch>
            <h1>Роутинг выше</h1>*/}

{/*
      <GoodsList goods={goodsExample} />
      <GoodExample />
      <Category category={exampleCategory} />
      <OrderGood orderGood={exampleOrderGood}/>
      <Order order={exampleOrder} />
      <OrderList orders={exampleOrderList} />
      <OrderGoodsList orderGoods={exampleOrderGoodsList} />
      */}

export default App;
