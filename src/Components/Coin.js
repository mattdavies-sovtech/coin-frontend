import {gql,useQuery} from '@apollo/client'
import './Coin.css';
import {useState} from 'react'; 

const COINS = gql`
query {
  coins {
  name
  price_usd
  symbol
  nameid
  percent_change_24h
  percent_change_1h
}
}
`;

const COIN = gql`
    query coin($nameid: String!) {
        coin(nameid: $nameid) {
            name
        }
    }
`;

function Coins() {
    const {loading, error, data} = useQuery(COINS);
    var [latestList, setLatestList] = useState();

    //filter and update latest list
    const handleRemove = (id) => {
      const newList = latestList.filter((coin) => coin.nameid !== id);
      setLatestList(newList);
    }

    //restore initial state
    const showAll = () => {
    setLatestList(data.coins);
    }
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    //async workaround?
    if(data == undefined) return <p>Undefined</p> 
    else if(latestList == null) {
      latestList = data.coins;
    }

    return (
      <>
      <div className="coins-container">
        <div className="float-container">
          <button className="btn btn-info"
            onClick={() => showAll()}
          >Show All Coins</button>
        </div>
      {latestList.map(({name, price_usd, symbol, nameid, percent_change_24h,percent_change_1h}) => (
        <>
              <div className="coin-container-outer">
              <div className="coin-container" key={name}>
              <div className="float-container">
              <div className="float-child">
                <h1>{name}</h1>
                <h3>{symbol}</h3>
                  
                   <p>Price(USD): {price_usd}</p>
                  </div>
                  <div className="float-child">
                    <h2>{percent_change_24h}</h2>
                    <h2>{percent_change_1h}</h2>
                  </div>
                </div>
                <div className="col">
                  <button
                    className="btn btn-info"
                    onClick={() => handleRemove(nameid)}
                  >Hide Coin</button>
                </div>
              </div>
            </div>
            <br></br>
            </>
      ))}
      </div>
      </>
    );
  }

  export default Coins;