const mongoose = require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/foodhub'
const mongoDB = async() => {
    
    await mongoose.connect(mongoURI,{useNewUrlParser:true})
        .then(async () => {
            console.log("connected")    
            const fetched_data =  mongoose.connection.db.collection("fooddata")
            fetched_data.find({}).toArray()
                .then(function (data) {
                    const foodCategory = mongoose.connection.db.collection("foodcategory")
                    foodCategory.find({}).toArray()
                    .then(function (catData) {
                        global.foodData = data;
                        global.foodCategory = catData;
                    })
                    .catch(function (err) {
                    console.log(err)
                    })
            })
                
        });
}

module.exports = mongoDB;
