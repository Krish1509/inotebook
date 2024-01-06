const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://krish1509soni:Dgr9DvOvKrJwUnnH@cluster0.n46ubpz.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}
//Dgr9DvOvKrJwUnnH
module.exports = connectToMongo