const mongoose = require('mongoose');

const eventiSchema = new mongoose.Schema({
    dataEvento:{
        type: Date
    },
    tipologiaEvento: {
        type: String
    },
    noteEvento: {
        type: String
    },
    proprietarioEventi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const Eventi = mongoose.model('eventi', eventiSchema);
module.exports = Eventi; 