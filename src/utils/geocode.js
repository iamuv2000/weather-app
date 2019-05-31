const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaWFteXV2aTIwMDAiLCJhIjoiY2p2Z2Z4Znp6MDZrdDQzbXRjZm4wamVxdyJ9.BmYOEecwobrF5X3UXZyHVw&limit=1'
    request({url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(response.body.features.length===0){
            callback('No results found',undefined)
        }
        else{
            const latitude =  response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined,{latitude,longitude,location})
        }
    })
}


module.exports = geocode