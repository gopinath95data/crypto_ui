import axios from 'axios'
import React, { useEffect } from 'react'
import { getData } from '../../utils/fn'
import { Table } from '@mantine/core'

function hh(props) {

  const elements = props.data

  const images = [
    "/images/btc.png",
    "/images/xmr.png",
    "/images/firo.png",
    "/images/ccx.png",
    "/images/arrr.png",
    "/images/wow.png",
    "/images/dero.png",
    "/images/grin.png",
    "/images/oxen.png",
  ]

  const rows = elements.map((element,key) => (
    <tr key={element.name} className="ihov" >
      <td className='name__it'>
        <div className="name">
          <img className='name__i' src={images?.[key]} alt="" width="30px" height="30px" />
          <div>
            <p className="name__n">{element.name}</p>
            <p className="name__s">{element.symbol}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="price">{element.price}</div>
      </td>
      <td>{element.high}</td>
      <td>{element.low}</td>
      <td>
        <div className='cond'>
          {element.perc}<img className={`${element.isDown?"down":"up"}`} src={`${element.isDown?"/images/down.svg":"/images/up.svg"}`} width="20px" height="20px" />
        </div> 
      </td>
      <style jsx>{
        `
        .ihov{cursor:pointer;transition:all .2s ease;background:white;box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;}
        .ihov:hover{transform:scale(1.02);}
        .name__it{display:flex;}
        .name{display:flex;align-items:center;padding:4px 16px;min-width:300px;}
        .name__i{margin-right:16px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;border-radius:50%;}
        .name__n{font-size:16px;font-weight:600;}
        .name__s{font-size:12px;font-weight:600;color:#808a9d;}
        .price{font-weight:600;font-size:15px;}
        .cond{display:flex;align-items:center;}
        .up{filter: invert(54%) sepia(98%) saturate(363%) hue-rotate(106deg) brightness(94%) contrast(95%);}
        .down{filter: invert(24%) sepia(84%) saturate(3768%) hue-rotate(344deg) brightness(109%) contrast(83%);}
        
        `
      }</style>
    </tr>

  ));

  return <>
    <div className="cs">
      <div className="cs__h">
        <img src='/images/logo.svg' />
      </div>
      <div className="cs__ct">
        <Table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>High</th>
              <th>Low</th>
              <th>Change(24h)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </div>

    <style global jsx>{
      `
      .cs__ct{padding:20px;background:#edf4ffa6;min-height:calc(100vh - 76px);}
      .cs__h{padding:20px;box-shadow:0 3px 5px rgba(57, 63, 72, 0.3);}
      table{
        border-spacing: 0 8px;
    border-collapse: separate !important;
      }
      table, tr, td, th {
        border: none !important; 
    }

      `
    }</style>
  
  </>
}


export default hh

export async function getServerSideProps(context){

  let links = [
    "https://coinmarketcap.com/currencies/bitcoin/",
    "https://coinmarketcap.com/currencies/monero/",
    "https://coinmarketcap.com/currencies/firo/",
    "https://coinmarketcap.com/currencies/conceal/",
    "https://coinmarketcap.com/currencies/pirate-chain/",
    "https://coinmarketcap.com/currencies/wownero/",
    "https://coinmarketcap.com/currencies/dero/",
    "https://coinmarketcap.com/currencies/grin/",
    "https://coinmarketcap.com/currencies/oxen/",
  ]
  
  let dataa = [] 
  links.forEach(element => {
    dataa.push(fetch(element))
  })

  console.log(dataa)

  const resp = await Promise.all(dataa)

  let prices = []
  async function getDataw () {
    for (const file of resp) {
      prices.push(await file.text())
    }
  }
  const respww = await getDataw()

  let rr = []

  prices?.map(item=>{
    rr.push(getData(item))
  })
  console.log(prices)
  return {
    props: { 
      data:rr,
     }
  }
}