const mongoose = require('mongoose');

const collectionName = "channels";

const chanSchema = mongoose.Schema({
    name : {type : String},
    userList : [{
        name : {type : String, required : true},
        sub : {type : String, required : true}
    }],
    },
    {collection : collectionName}
);

module.exports = mongoose.model('Channel', chanSchema);