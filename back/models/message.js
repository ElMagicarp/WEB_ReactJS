const mongoose = require('mongoose');

const collectionName = "messages";

const msgSchema = mongoose.Schema({
    author : {type : String, required : true},
    message : {type : String, required : true},
    channel : {type : String, required : true},
    picture : {type : String, required : false},
    },
    {timestamps : true, collection : collectionName}
);

module.exports = mongoose.model('Message', msgSchema);