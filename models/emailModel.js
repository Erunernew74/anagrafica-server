const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    indirizzoEmail: {
        type: String
    },
    noteEmail: {
        type: String
    },
    proprietarioEmail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const Email = mongoose.model('email', emailSchema);
module.exports = Email;