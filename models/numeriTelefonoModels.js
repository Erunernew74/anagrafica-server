const mongoose = require('mongoose');

const numeriTelefonoSchema = new mongoose.Schema({
    tipologiaNumeroTelefono: {
        type: String
    },
    numeroTelefono: {
        type: String
    },
    proprietaNumeroTelefono: {
        type: String
    },
    noteNumeroTelefono: {
        type: String
    },
    proprietaNumeriTelefono: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const NumeriTelefono = mongoose.model('numeriTelefono', numeriTelefonoSchema)
module.exports = NumeriTelefono