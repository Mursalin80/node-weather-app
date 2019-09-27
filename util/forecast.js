const request = require('request');


module.exports.foreCast = (latitude,langitude,callback)=>{
    let = url =`https://api.darksky.net/forecast/b5a66edeca0a32ed6b57697ed9ed345e/${latitude},${langitude}?exclude=hourly,minutely,flags,alerts&units=si`
    request({url:url,json:true},(error,{body}={})=>{
        if (error) {
            callback('Unable to connect wether service')
        } else if(body.error){
            callback('Unable to find wether location')

        } else {
            console.log('Currently: ',body.currently);
            // console.log('Daily: ',body.daily.data);
            callback(null,body)
        }
    })
}