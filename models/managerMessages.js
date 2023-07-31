const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema({
    date: Date,
    name: String,
    email: String,
    phone: String
});
const ManagerMessages = mongoose.model("ManagerMessages", managerSchema);
module.exports = ManagerMessages;