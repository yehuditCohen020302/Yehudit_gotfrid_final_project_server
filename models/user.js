const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    // status: {
    //     type: String,
    //     enum: ['active', 'inActive']
    // },
    height: {
        type: String
    },
    weights: {
        type: String
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;