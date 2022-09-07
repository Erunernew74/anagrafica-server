const mongoose = require('mongoose');

const contattiAziendaSchema = new mongoose.Schema({
    tipologiaContattoAzienda: {
        type: String
    },
    specificaContattoAzienda: {
        type: String
    },
    personaRiferimentoAzienda: {
        type: String
    },
    noteContattiAzienda: {
        type: String
    },
    proprietarioContattiAzienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const ContattiAzienda = mongoose.model('contattiAzienda', contattiAziendaSchema);
module.exports = ContattiAzienda;