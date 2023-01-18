
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { promiseReducer, actionAuthLogin, frontEndReducer, actionRootCats, goodsReducer, cartReducer, actionRestoreCart, cartGoodsReducer } from './reducers';
import { CGood, CGoodsList, CLoginForm, CMainAppBar, COrder, COrdersList, exampleOrder, goodsExample, GoodsList, MyLink, Order } from "./Components";
import { CLogout } from './Components';
import { CSidebar } from './Components/Sidebar';
import { CRootCats } from './Components';

import './App.css';
import { CCategory } from './Components/Category';
import { categoryReducer } from './reducers/categoryReducer';
import { ordersReducer } from './reducers/ordersReducer';
import { CCart } from './Components/Cart';
import { authApiReducer, authReducer, authApiReducerPath, loginApi, authReducerPath } from './reducers';
import storage from "redux-persist/lib/storage";

import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';



export const history = createBrowserHistory();


const rootReducer = combineReducers({
  [authReducerPath]: persistReducer({ key: authReducerPath, storage }, authReducer),
  [authApiReducerPath]: authApiReducer,
  promise: promiseReducer,
  frontend: frontEndReducer,
  category: categoryReducer,
  orders: ordersReducer,
  goods: goodsReducer,
  cart: cartReducer,
  cartData: cartGoodsReducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
    loginApi.middleware],
  reducer: rootReducer
});
store.subscribe(() => console.log(store.getState()))
const persistor = persistStore(store)

//console.log(useParams)
//store.dispatch(actionAuthLogin(localStorage.authToken));
store.dispatch(actionRootCats());
store.dispatch(actionRestoreCart());
console.log('TTTTT' + performance.now())


const NotFound = () =>
  <div>
    <h1>404 not found</h1>
  </div>


const Main = () =>
  <div>
    <h1>Main page</h1>
  </div>


function App() {

  return (
    <>
      <Router history={history}>
        <Provider store={store}>
          <div className="App">
            <CMainAppBar />
            <CSidebar menuComponent={() => <CRootCats />} />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/orders" component={COrdersList} />
              <Route path="/goods" component={CGoodsList} />
              <Route path="/good/:_id" component={CGood} />
              <Route path="/category/:_id" component={CCategory} />
              <Route path="/order/:_id" component={COrder} />
              <Route path="/cart" component={CCart} />
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
