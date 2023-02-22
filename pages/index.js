import axios from 'axios'
import React from 'react'
import cheerio from 'cheerio'

function hh(props) {

  console.log(props)

  return (
    <div>hh</div>
  )
}


export default hh

export async function getServerSideProps(context){
  const { data } = await axios.get('https://coinmarketcap.com/')
  const $ = cheerio.load(data)
  const reqs = $('.cmc-table')
  const spans = $('span') 
  const links = reqs.find('td')
  const n = links.map(function () {
    return {
      numbers: $(this).text().trim(),
      labels: $(this).next(".labels").text().trim(),
    }
  }).toArray()
  console.log(n);
  console.log(links.length)
  return {
    props: { 
      data:n
     }
  }
}