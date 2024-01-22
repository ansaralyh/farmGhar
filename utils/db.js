const mongoose = require('mongoose')


const connectToDb = ()=>{
    mongoose.connect('mongodb+srv://admin:123@cluster0.r18pd14.mongodb.net/farmGhar').then(()=>{
        console.log('MongoDB connected successfully')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectToDb