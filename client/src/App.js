import './App.css';
import {Route} from "react-router-dom";
import Login from './Components/Login.jsx';
import Signup from './Components/Signup';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component ={Login}></Route>
      <Route exact path="/Signup" component ={Signup}/>
      <Route exact path="/Header" component ={Header}/>
    </div>
  );
}

export default App;
