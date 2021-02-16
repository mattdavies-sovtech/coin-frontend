import react, { useState } from 'react';
import {gql, useQuery} from '@apollo/client';
import './CoinInfo.css';

const COIN_MARKET = gql`
  query getMarkets($cid: String){
    coinMarket(cid: $cid) {
      name
      base
      qoute
      price
      volume
      time
    }
  }
`;

function CoinInfo(idg) {
    if(idg == undefined) {
        idg = '0';
    }
    const {loading,error,data} = useQuery(COIN_MARKET, {variables: {cid: (idg.idg).toString()}});
    if (data == undefined) return 'undefined';
    else {
    return(
        <div className="market-container">
        {data.coinMarket.map(({name,base,qoute,price,volume,time}) => (
            <div className="outer">
            <div className="inner">
                <h1>{name}</h1>
                <h2>{base}</h2>
                <p>{qoute}</p>
                <p>Price: {price}</p>
                <p>Volume: {volume}</p>
                <p>Time: {time}</p>
            </div>
            </div>
          ))}
        </div>
    )
}
}

export default CoinInfo