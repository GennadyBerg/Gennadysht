import { Router, Route, Switch } from 'react-router-dom';
import { store, persistedStore } from './store';
import { Provider } from 'react-redux';
import { CCategoriesList, CEditableCategory, CEditableGood, CGood, CGoodsList, CLoginForm, CMainAppBar, COrder, COrdersList, CRegisterForm, CUser, CUsersList } from "./Components";
import { CLogout } from './Components';
import { CSidebar } from './Components/Sidebar';
import { CRootCats } from './Components';
import './App.css';
import { CCategory } from './Components/Category';
import { CCart } from './Components/Cart';
import { createBrowserHistory } from "history";
import { PersistGate } from 'redux-persist/integration/react';
import { Typography } from '@mui/material';
export const history = createBrowserHistory();


//import { cartReducer, actionRestoreCart } from './reducers';
//store.dispatch(actionAuthLogin(localStorage.authToken));
//store.dispatch(actionRootCats());
//store.dispatch(actionRestoreCart());

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
          <PersistGate loading={<Typography>Loading...</Typography>} persistor={persistedStore}>
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
                <Route path="/editablecategory/:_id" component={CEditableCategory} />
                <Route path="/order/:_id" component={COrder} />
                <Route path="/cart" component={CCart} />
                <Route path="/login" component={CLoginForm} />
                <Route path="/register" component={CRegisterForm} />
                <Route path="/user/:_id" component={CUser} />
                <Route path="/user" component={CUser} />
                <Route path="/logout" component={CLogout} />
                <Route path="/catree" component={CCategoriesList} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </PersistGate>
        </Provider>
      </Router>
    </>

  );
}

export default App;
