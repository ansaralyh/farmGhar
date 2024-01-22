const mongoose = require('mongoose')


const connectToDb = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/farmGhar').then(()=>{
        console.log('MongoDB connected successfully')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectToDb