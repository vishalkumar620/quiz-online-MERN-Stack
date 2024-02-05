const mongoose = require('mongoose')
require("dotenv").config()
const URI = process.env.MONGO_URL

const connectedToMongo = () =>{
 
   mongoose.connect(URI).then((res)=>{
      console.log("Connected to MongoDb Successfully");
   }).catch((error)=>{
      console.log("Failed to Connect with MongoDb");
   })
}

module.exports = connectedToMongo;



// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL);

// const connection = mongoose.connection;

// connection.on("connected", () => {
//   console.log("mongodb connection succesful");
// });

// connection.on("error", (err) => {
//   console.log("Mongo Db Connetion Failed");
// });

// module.exports = connection;
