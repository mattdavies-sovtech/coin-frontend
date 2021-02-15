import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMinusCircle, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import '../Components/Coin.css';
import {useState,useEffect} from 'react'; 

function Coins() {
  
  const [coin, setCoins] = useState([
    {title: "1", symbol: "BTC", name: "Bitcoin", id: 1},
    {title: "2", symbol: "ETH", name: "Bitcoin", id: 2},
    {title: "3", symbol: "ADA", name: "Bitcoin", id: 3},
    {title: "4", symbol: "DGC", name: "Bitcoin", id: 4}
  ])
//local storage init.
/*
const useStateWithLocalStorage = localStorageKey => {
  const [coin,setCoins] = useState(
    localStorage.getItem(localStorageKey) || allCoins
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}
*/

//initial state
const [allCoins, setAllCoins] = useState(coin);
const [isAllCoins, setIsAllCoins] = useState(true);

//coin filter
const handleRemove = (id) => {
  const newList = coin.filter((coin) => coin.id !== id)
  setCoins(newList);
  setIsAllCoins(true);
}

//restore initial state
const showAll = () => {
  setCoins(allCoins);
}
  
  
  return (
    
    //map filter
    <>
    <br></br>
      <div className="coins-header">
          <button className="btn btn-info" onClick={() => showAll()}>Show All Coins</button>
        </div>
    
    {coin.map((coin) => (
      <>
        <div className="coin-container">
          <h1>{coin.symbol}</h1>
          <button className="btn btn-info">Display Info</button>
          <div className="col">
            <p>Hide Coin</p>
            <FontAwesomeIcon icon={faMinusCircle} className="del-icon"
              onClick={() => handleRemove(coin.id)}/>
          </div>
        </div>
        <br></br>
      </>
    ))}
    </>
   
  );
}

export default Coins;