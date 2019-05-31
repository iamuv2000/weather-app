const request = require('request')



const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/b73850539680551dc7bd9d9cd2879172/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.daily.summary)
        }
    })
}

module.exports = forecast