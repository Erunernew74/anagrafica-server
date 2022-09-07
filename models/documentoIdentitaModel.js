const mongoose = require('mongoose');

const documentoIdentitaSchema = new mongoose.Schema({
    tipologiaDocumentoIdentita: {
        type: String
    },
    numeroDocumentoIdentita: {
        type: String
    },
    dataRilascio: {
        type: Date
    },
    dataScadenza: {
        type: Date
    },
    enteRilascio: {
        type: String
    },
    proprietarioDocumentoIdentita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const DocumentoIdentita = mongoose.model('documentoIdentita', documentoIdentitaSchema);
module.exports = DocumentoIdentita;