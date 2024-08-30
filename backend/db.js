const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://divyaguptadg365:divya@cluster0.txidp42.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async()=>{
    await mongoose.connect(mongoURI,{ useNewUrlParser:true },(err,result)=>{
        if(err){
            console.log("---",err);
        }
        else{
            console.log("connected");
            const FetchedData = mongoose.connection.db.collection("food_items");
            FetchedData.find({}).toArray(async function(err,data){
                const food_Category = await mongoose.connection.db.collection("food_Category");
                food_Category.find({}).toArray(function(err,catData){
                    if(err){
                        console.log(err);
                    }
                    else{
                        global.food_items = data;
                        global.food_Category = catData;
                    }
                })
            })
        }
    });
}

module.exports = mongoDB;