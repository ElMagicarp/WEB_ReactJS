const mongoose = require('mongoose');

const collectionName = "channels";

const chanSchema = mongoose.Schema({
    name : {type : String, required : true}
    },
    {collection : collectionName}
);

module.exports = mongoose.model('Channel', chanSchema);