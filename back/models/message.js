const mongoose = require('mongoose');

const collectionName = "messages";

const msgSchema = mongoose.Schema({
    author : {
        name : {type : String, required : true},
        sub : {type : String, required : true},
        picture : {type : String}
    },
    message : {type : String, required : true},
    channel : {type : mongoose.Schema.Types.ObjectId, ref:'Channel',required : true},
    picture : {type : String, required : false},
    },
    {timestamps : true, collection : collectionName}
);

module.exports = mongoose.model('Message', msgSchema);