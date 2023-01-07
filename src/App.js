
import { Router, Route, Switch, useParams } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import { authReducer, promiseReducer, actionAuthLogin, frontEndReducer } from './reducers';
import { CLoginForm, CMainAppBar } from "./Components";
import { CLogout } from './Components';
import { CSidebar } from './Components/Sidebar';
import thunk from 'redux-thunk';

import './App.css';

export const history = createBrowserHistory();

export const store = createStore(combineReducers({ promise: promiseReducer, auth: authReducer, frontend: frontEndReducer }), applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()))

//console.log(useParams)
store.dispatch(actionAuthLogin(localStorage.authToken));
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
            <CSidebar menuComponent={() => <div>TEST!!!!!!</div>} />
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
