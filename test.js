/* Example in Node.js ES6 using request-promise */

const rp = require('request-promise');
const fs = require('fs');
const apiKey = 'd596596e-ee72-45a3-ae0d-f14b779d7d5b' // product env key
const apiTestKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c' // for test
const xlsx = require('node-xlsx');
const requestOptions = {
  method: 'GET',
  uri: '',
  qs: {
    'start': '1',
    'limit': '30',
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
    // writeFile(response) 
    writeExcel(response)

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


function writeExcel(d){
  try{
    var excelData = [];
    {
        var addInfo = {};
        var myDate = new Date(); 
        var timestr = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes(); 

        addInfo.name = "新增Token表"+timestr;
        addInfo.data = [
            ["当前获取数据时间", "Token Name","Token符号" ,"当前价格",'24小时交易量', "添加时间","最大供应量","所在链","合约地址",'排名','1小时变化率','24小时变化率','全部稀释市值','更新时间'],
        ];
        
        
        for(i=0;i<d.data.length;i++){
          var pushD =[]
          pushD.push(d.status.timestamp)
          pushD.push(d.data[i].name)
          pushD.push(d.data[i].symbol)
          pushD.push(d.data[i].quote.USD.price)
          pushD.push(d.data[i].quote.USD.volume_24h)
          pushD.push(d.data[i].date_added)
          pushD.push(d.data[i].max_supply)
          pushD.push(d.data[i].platform.name)
          pushD.push(d.data[i].platform.token_address)
          pushD.push(d.data[i].cmc_rank)
          
          pushD.push(d.data[i].quote.USD.percent_change_1h)
          pushD.push(d.data[i].quote.USD.percent_change_24h)
          pushD.push(d.data[i].quote.USD.fully_diluted_market_cap)
          pushD.push(d.data[i].quote.USD.last_updated)
          // pushD.push(d.data[i].symbol)

          addInfo.data.push(pushD);
          pushD =[]
        }        
 
        excelData.push(addInfo);
      }
      var buffer = xlsx.build(excelData);
        var timestrf = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes()+"-"+myDate.getSeconds(); 
      fs.writeFile('./data'+timestrf+'.xls', buffer, function (err) {
          if (err){
            throw err;
          }
          console.log('Write to xls has finished');
      });
  }catch(e){
      console.log("excel write error,error=%s", e.stack);
  }    
}

const baseUrl = 'https://pro-api.coinmarketcap.com/v1/'
const endPoint = 'cryptocurrency'
const surl = '/listings/latest'
// getData(baseUrl+endPoint+surl).then(data=>(console.log(data)))

getData(baseUrl+endPoint+surl)




