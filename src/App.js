
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { promiseReducer, frontEndReducer, cartReducer, actionRestoreCart, cartGoodsReducer, goodsApi } from './reducers';
import { CGood, CGoodsList, CLoginForm, CMainAppBar, COrder, COrdersList } from "./Components";
import { CLogout } from './Components';
import { CSidebar } from './Components/Sidebar';
import { CRootCats } from './Components';

import './App.css';
import { CCategory } from './Components/Category';
import { categoryApi } from './reducers/categoryReducer';
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
  [categoryApi.reducerPath]: persistReducer({ key: categoryApi.reducerPath, storage }, categoryApi.reducer),
  [goodsApi.reducerPath]: persistReducer({ key: goodsApi.reducerPath, storage }, goodsApi.reducer),
  promise: promiseReducer,
  frontend: frontEndReducer,
  orders: ordersReducer,
  cart: cartReducer,
  cartData: cartGoodsReducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
    categoryApi.middleware,
    goodsApi.middleware,
    loginApi.middleware],
  reducer: rootReducer
});
store.subscribe(() => console.log(store.getState()))
const persistor = persistStore(store)

//store.dispatch(actionAuthLogin(localStorage.authToken));
//store.dispatch(actionRootCats());
store.dispatch(actionRestoreCart());

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

export default App;
