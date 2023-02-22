import axios from 'axios'
import React, { useEffect } from 'react'
import { getData } from '../../utils/fn'
import { Table } from '@mantine/core'

function hh(props) {

  const elements = props.data;

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.price}</td>
      <td>{element.high}</td>
      <td>{element.low}</td>
      <td>{element.perc}<img src={`${element.isDown?"/images/decrease.png":"/images/increase.png"}`} width="20px" height="20px" /></td>
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
              <th>Name</th>
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

    <style jsx>{
      `
      .cs__ct{padding:20px;background:#edf4ffa6;height:calc(100vh - 76px);}
      .cs__h{padding:20px;box-shadow:0 3px 5px rgba(57, 63, 72, 0.3);}
      `
    }</style>
  
  </>
}


export default hh

export async function getServerSideProps(context){

  let links = [
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