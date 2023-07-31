const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String
    },
    userId: {
        type: String
    },
    messages: [{
        date: Date,
        content: String
    }]

});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;