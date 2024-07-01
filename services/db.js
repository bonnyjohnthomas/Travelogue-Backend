
const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/TravelLog')

const Traveller=mongoose.model('Traveller',{
    id:Number,
    password:String,
    name:String,
    age:String,
    image:String,
    profession:String,
    country:String,
    locations:[]

})

module.exports={
    Traveller
}