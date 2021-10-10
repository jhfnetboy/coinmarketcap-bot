/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');
const fs = require('fs');
const apiKey = 'd596596e-ee72-45a3-ae0d-f14b779d7d5b' // product env key
const apiTestKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c' // for test
const requestOptions = {
  method: 'GET',
  uri: '',
  qs: {
    'start': '1',
    'limit': '2',
    'convert': 'USD',
    'sort': 'date_added',
    'sort_dir': 'desc'
  },
  headers: {
    'X-CMC_PRO_API_KEY': apiKey
  },
  json: true,
  gzip: true
};


async function getData(surl){
  requestOptions.uri= surl
  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    writeFile(response) 

  }).catch((err) => {
    console.log('API call error:', err.message);
  });
}

function writeFile(data){
  namet = String(data.status.timestamp)
  data = JSON.stringify(data)
  fs.writeFile(namet+'.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
}

const baseUrl = 'https://pro-api.coinmarketcap.com/v1/'
const endPoint = 'cryptocurrency'
const surl = '/listings/latest'
// getData(baseUrl+endPoint+surl).then(data=>(console.log(data)))

getData(baseUrl+endPoint+surl)




