import {gql,useQuery} from '@apollo/client'
import './Coin.css';
import {useState, useEffect} from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faCoffee } from '@fortawesome/free-solid-svg-icons';
//import GetCoinMarkets from './GetCoinMarkets';
import CoinInfo from './CoinInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const COINS = gql`
query {
  coins {
  id
  name
  price_usd
  symbol
  nameid
  percent_change_24h
  percent_change_1h
}
}
`;

const COIN_MARKET = gql`
  query getMarkets($cid: String){
    coinMarket(cid: $cid) {
      name
    }
  }
`;

const COIN = gql`
    query {
        coin(nameid: String) {
            name
        }
    }
`;
function Coins() {
    const {loading, error, data} = useQuery(COINS);
    var [coinList, setCoinList] = useState(JSON.parse(localStorage.getItem("coinList")));
    var [latestList, setLatestList] = useState(coinList);

    //Refresh local list data
    const refreshLocal = () => {
      try {
      for(var i = 0; i < latestList.length; i++) {
        for(var j = 0; j < data.coins.length; j++) {
          if(latestList[i].nameid == data.coins[j].nameid) {
            latestList[i].price_usd = data.coins[j].price_usd;
            if(latestList[i].percent_change_1h !== data.coins[j].percent_change_1h) {
              console.log("PREV VAL:",latestList[i].percent_change_1h);
              console.log("CURR VAL:", data.coins[j].percent_change_1h);
            }
            latestList[i].percent_change_1h = data.coins[j].percent_change_1h;
            latestList[i].percent_change_24h = data.coins[j].percent_change_24h;
          }
        }
      }
    }
    catch {

    }
      console.log("Local Data Refreshed!");
    }

    //filter and update latest list
    const handleRemove = (id) => {
      const newList = latestList.filter((coin) => coin.nameid !== id);
      setLatestList(newList);
      localStorage.setItem("coinList",JSON.stringify(newList));
      refreshLocal();
    }

    //check increase/decrease

    //restore initial state
    const showAll = () => {
      setLatestList(data.coins);
      localStorage.setItem("coinList", JSON.stringify(data.coins));
      setCoinList(localStorage.getItem("coinList"));
    }

    //get market data
    // function getMarketData(id) {
    //   const {loading,error,data} = useQuery(COIN_MARKET, {variables: {id: id}});
    // }
    // const handleMoreInfo = (nameid) => {
    //     GetMarketData(nameid);
    // }
    
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    //async workaround?
    if(data == undefined) return <p>Undefined</p> 
    else if(latestList == null) {
      showAll();
    } 
    if(coinList == null) {
      showAll();
    } else {
    return (
      <>
        <div className="coins-container">
          <div className="float-container">
            <button className="btn btn-info"
              onClick={() => showAll()}
            >Show All Coins</button>
          </div>
        {latestList.map(({id,name, price_usd, symbol, nameid, percent_change_24h,percent_change_1h}) => (
          <>
          <Router>
                <div className="coin-container-outer" key={name}>
                <div className="coin-container" >
                <div className="float-container">
                <div className="float-child">
                  <h1>{name}({symbol})</h1>
                    <h4>Price(USD): {price_usd}</h4>
                    </div>
                    <div className="float-child">
                      <div>
                        {parseFloat(percent_change_24h) > 0 ? 
                        <FontAwesomeIcon color="green" icon={faCaretUp} size="2x"></FontAwesomeIcon> : 
                        <FontAwesomeIcon color="red" icon={faCaretDown} size="2x"></FontAwesomeIcon>}
                      <h2 className="line-item">{percent_change_24h}</h2>
                      </div>
                      <div>
                        {parseFloat(percent_change_1h) < 0 ?
                        <FontAwesomeIcon color="red" icon={faCaretDown} size="2x"></FontAwesomeIcon> : 
                        <FontAwesomeIcon color="green" icon={faCaretUp} size="2x"></FontAwesomeIcon>
                        }
                      
                      <h2 className="line-item">{percent_change_1h}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <Link to="/coin-info"><button className="btn btn-info"
                        //onClick={() => handleMoreInfo(nameid) }
                      >More Info</button></Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(nameid)}
                    >Hide Coin</button>
                  </div>
                </div>
              </div>
              <Switch>
               <Route path="/coin-info">
                 <CoinInfo idg={id}></CoinInfo>
               </Route>
              </Switch>
              </Router>
              <br></br>
              </>
        ))}
        </div>
        
      </>
    );
  }
  }

  export default Coins;