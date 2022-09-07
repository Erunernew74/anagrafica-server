const mongoose = require('mongoose');

const prestitiEsistentiSchema = new mongoose.Schema({
    tipologiaPrestiti:{
        type: String
    },
    importoRata: {
        type: String
    },
    dataInizio: {
        type: Date
    },
    dataScadenza: {
        type: Date
    },
    ritardiPrestito: {
        type: String
    },
    enteErogatore: {
        type: String
    },
    notePrestito: {
        type: String
    },
    proprietaPrestitiEsistenti: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const PrestitiEsistenti = mongoose.model('prestitiEsistenti', prestitiEsistentiSchema)
module.exports = PrestitiEsistenti