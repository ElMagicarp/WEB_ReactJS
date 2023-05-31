const mongoose = require('mongoose');

const collectionName = "messages";

const msgSchema = mongoose.Schema({
    author : {type : String, required : true},
    message : {type : String, required : true},
    channel : {type : String, required : true},
    },
    {timestamps : true, collection : collectionName}
);

module.exports = mongoose.model('Message', msgSchema);