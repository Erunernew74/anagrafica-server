//* Tabella generale dell'anagrafica

const mongoose = require("mongoose");

const anagraficaSchema = new mongoose.Schema({
    dataInserimento: {
        type: Date
    },
    nome: {
        type: String
    },
    cognome: {
        type: String
    },
    compleanno: {
        type: Date
    },
    capComuneNascita: {
        type: String
    },
    comuneNascita: {
        type: String
    },
    provNascita: {
        type: String
    },
    genere: {
        type: String
    },
    codiceFiscale: {
        type: String
    },
    indirizzoResidenza: {
        type: String
    },
    capResidenza: {
        type: String
    },
    comuneResidenza: {
        type: String
    },
    provResidenza: {
        type: String
    },
    indirizzoDomicilio: {
        type: String
    },
    capDomicilio: {
        type: String
    },
    comuneDomicilio: {
        type: String
    },
    provDomicilio: {
        type: String
    },
    tipologiaLavoro: {
        type: String
    },
    dataAssunzione: {
        type: Date
    },
    nomeAzienda: {
        type: String
    },
    ragioneSocialeAzienda: {
        type: String
    },
    numeroDipendentiAzienda: {
        type: Number
    },
    indirizzoAzienda: {
        type: String
    },
    capAzienda: {
        type: String
    },
    comuneAzienda: {
        type: String
    },
    provAzienda: {
        type: String
    },
    codiceFiscalePivaAzienda: {
        type: String
    },
    note: {
        type: String
    },
    contattiAzienda: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contattiAzienda'
    }],
    email: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'email'
    }],
    eventi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventi'
    }],
    documentoIdentita: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documentoIdentita'
    }],
    prestitiEsistenti: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prestitiEsistenti'
    }],
    numeriTelefono: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'numeriTelefono'
    }],
    schedaPratica: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedaPratica'
    }]

})

const Anagrafica = mongoose.model('anagrafica', anagraficaSchema);
module.exports = Anagrafica;