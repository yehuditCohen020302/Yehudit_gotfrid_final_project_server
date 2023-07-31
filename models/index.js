//const dbConfig = require('../config/db.config')
/*
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.PORT); 
*/
const mongoose = require("mongoose");
let url = "mongodb+srv://sapir:5RWupXv3OYajEf4J@cluster0.1ghrpjo.mongodb.net/";
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = url;
db.diary = require("./diary");
db.user = require("./user");
module.exports = db;