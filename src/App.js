import logo from './logo.svg';
import './App.css';
import { 
  JqlTests_RootCats, 
  JqlTests_RetrieveRootCats,
  JqlTests_AuthLogin,
  JqlTests_Goods,
  JqlTests_GoodFindOne,
  JqlTests_AuthUpsert
 } from './Tests/test_jql';
import { LoginForm, GoodExample } from "./Components";


function App() {
  return (
    <GoodExample />
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
