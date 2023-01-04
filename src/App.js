import React, { useRef, createElement, Component } from 'react';
import { Router, Route, Redirect, Switch, useParams } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import './App.css';
import { authReducer, promiseReducer } from './reducers';
import { actionFullLogin, actionRootCats } from './jql_actions'
import { CLoginForm, GoodExample, GoodsList, goodsExample, Category, exampleCategory, OrderGood, exampleOrderGood, Order, exampleOrder, OrderList, exampleOrderList, exampleOrderGoodsList, OrderGoodsList } from "./Components";
import { MyLink } from './Components';
import { MainAppBar } from './Components';


export const history = createHistory()
console.log(useParams)
const store = createStore(combineReducers({ promise: promiseReducer, auth: authReducer }), applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

store.dispatch(actionRootCats())


/*const CCatMenu = connect(state => ({ cats: state.promise?.rootCats?.payload || [] }), { onLogin: actionFullLogin })(CatMenu)

const CLoginForm = connect(null, { onLogin: actionFullLogin })(LoginForm)*/
const NotFound = () =>
    <div>
        <h1>404 not found</h1>
    </div>

function App() {
  return (
    <>

      <Router history={history}>
        <Provider store={store}>
          <div className="App">
            <MainAppBar />
            <Switch>
              {/*<Route path="/" component={Main} exact />*/}
              <Route path="/login" component={CLoginForm} />
              <Route path="*" component={NotFound} />
            </Switch>
            {/*<CCatMenu />
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
          </div>
        </Provider>
      </Router>
      {/*
      <GoodsList goods={goodsExample} />
      <GoodExample />
      <Category category={exampleCategory} />
      <OrderGood orderGood={exampleOrderGood}/>
      <Order order={exampleOrder} />
      <OrderList orders={exampleOrderList} />
      <OrderGoodsList orderGoods={exampleOrderGoodsList} />
      */}
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


export default App;
