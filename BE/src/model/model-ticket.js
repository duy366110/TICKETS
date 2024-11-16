const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelUser = new Schema({
    content: ""
}, {
    collection: 'tickets'
})

module.exports = mongoose.model('tickets', ModelUser);