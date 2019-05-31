const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname,'../public')

app.use(express.static(publicDirectory))



geocode('Pune',(error,data)=>{
    if(error){
        return console.log(error)
    }
    forecast(data.latitude,data.longitude,(error,forecastData)=>{
        if (error) {
            return console.log(error) 
        }

        console.log(data.location)
        console.log(forecastData)
    })
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({error:'Please provide a location'})
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return console.log(error)
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return console.log(error) 
            }
    
            res.send(
                {
                    latitude,
                    longitude,
                    location,
                    forecastData   
                }
            )
        })
    })
})




app.listen(port,()=>{
    console.log('Server is up on port ',port)
})