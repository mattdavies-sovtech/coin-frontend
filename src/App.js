import './App.css';
import Coin from './Components/Coin.js';
import React from 'react';
import CoinInfo from './Components/CoinInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
  return (
    <Coin></Coin>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/coins">Coins</Link>
    //         </li>
    //         <li>
    //           <Link to="/coin-info">Coin-Info</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/* A <Switch> looks through its children <Route>s and
    //         renders the first one that matches the current URL. */}
    //     <Switch>
    //       <Route path="/coins">
    //         <Coin></Coin>
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
} 
}

export default App;
