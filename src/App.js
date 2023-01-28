
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { promiseReducer, frontEndReducer, cartReducer, actionRestoreCart, goodsApi, cartGoodsApi } from './reducers';
import { CEditableGood, CGood, CGoodsList, CLoginForm, CMainAppBar, COrder, COrdersList, CRegisterForm, CUser, CUsersList } from "./Components";
import { CLogout } from './Components';
import { CSidebar } from './Components/Sidebar';
import { CRootCats } from './Components';
import './App.css';
import { CCategory } from './Components/Category';
import { categoryApi } from './reducers/categoryReducer';
import { ordersApi } from './reducers/ordersReducer';
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
import { EditPost } from './Test/drop';
import { FileDropZone } from './Components/FileDropZone';
import { useEffect } from 'react';



export const history = createBrowserHistory();


const rootReducer = combineReducers({
  [authReducerPath]: persistReducer({ key: authReducerPath, storage }, authReducer),
  [authApiReducerPath]: authApiReducer,
  //[categoryApi.reducerPath]: persistReducer({ key: categoryApi.reducerPath, storage }, categoryApi.reducer),
  //[goodsApi.reducerPath]: persistReducer({ key: goodsApi.reducerPath, storage }, goodsApi.reducer),
  //[ordersApi.reducerPath]: persistReducer({ key: ordersApi.reducerPath, storage }, ordersApi.reducer),
  [categoryApi.reducerPath]: categoryApi.reducer,
  [goodsApi.reducerPath]: goodsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [cartGoodsApi.reducerPath]: cartGoodsApi.reducer,
  promise: promiseReducer,
  frontend: frontEndReducer,
  cart: cartReducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
    categoryApi.middleware,
    goodsApi.middleware,
    ordersApi.middleware,
    loginApi.middleware,
    cartGoodsApi.middleware],
  reducer: rootReducer
});
store.subscribe(() => console.log(store.getState()))
/*const persistor = */persistStore(store)

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

//<EditPost onSave={post => console.log(post)}/>
function App() {
  return (
    <>
      <Router history={history}>
        <Provider store={store}>
          <div className="App">
            <CMainAppBar />
            <CSidebar id="sidBar" menuComponent={() => <CRootCats />} />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/orders" component={COrdersList} />
              <Route path="/users" component={CUsersList} />
              <Route path="/goods" component={CGoodsList} />
              <Route path="/good/:_id" component={CGood} />
              <Route path="/editgood/:_id" component={CEditableGood} />
              <Route path="/editgood" component={CEditableGood} />
              <Route path="/category/:_id" component={CCategory} />
              <Route path="/order/:_id" component={COrder} />
              <Route path="/cart" component={CCart} />
              <Route path="/login" component={CLoginForm} />
              <Route path="/register" component={CRegisterForm} />
              <Route path="/user/:_id" component={CUser} />
              <Route path="/user" component={CUser} />
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
