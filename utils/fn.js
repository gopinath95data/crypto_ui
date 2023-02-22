import cheerio from 'cheerio'


export const getData = (ccs) =>{
  const cc = cheerio.load(ccs)
  const reqs = cc('div.priceValue')
  const reqs1 = cc('span')
  // console.log(reqs.length)
  // const spans = $('span') 
  // const links = reqs.find('td')
  const n = reqs.map(function () {
    return {
      text:cc(this).text().trim(),
    }
  }).toArray()
  const secs = cc('.priceSection').find('span')
  const hh = cc('.priceSection').find('h1')
  // console.log(secs.length)
  const n1 = secs.map(function () {
    return {
      text:cc(this).text().trim(),
      isDown:cc(this).hasClass('icon-Caret-down'),
    }
  }).toArray()
  const n2 = hh.map(function () {
    return {
      text:cc(this).text().trim(),
    }
  }).toArray()
  
  // console.log(imgs.length)

  let obj = {}
  obj["price"] = n[0].text
  obj["low"] = n1[9].text
  obj["high"] = n1[13].text
  obj["perc"] = n1[1].text
  obj["isDown"] = n1[2].isDown
  obj["name"] = n2[0].text

  return obj
  // console.log(obj)
}