const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String
    },
    userId: {
        type: String
    },
    diaryDays: [{
        date: String,
        meals: [{
            id: Number,
            label: String,
            total_sugars: Number,
            natran: Number,
            ashlegan: Number,
            energy: Number
        }]
    }]

});
const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;


// const diaryByUserSchema = new mongoose.Schema({
//     _id: {
//         type: mongoose.SchemaTypes.String
//     },
//     userId: {
//         type: String
//     },
//     diaryDays: [{
//         date: Date,
//         foods: [String]
//     }]
// });
// const DiaryByUser = mongoose.model("DiaryByUser", diaryByUserSchema);
// module.exports = DiaryByUser;