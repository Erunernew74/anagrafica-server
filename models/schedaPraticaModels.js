const mongoose = require('mongoose');

const schedaPraticaSchema = new mongoose.Schema({
    dataSchedaPratica: {
        type: Date
    },
    esitoSchedaPratica: {
        type: String
    },
    enteErogatoreSchedaPratica: {
        type: String
    },
    importoRataSchedaPratica: {
        type: Number
    },
    durataMesiSchedaPratica: {
        type: Number
    },
    montanteSchedaPratica: {
        type: Number
    },
    percentualeCommissioniSchedaPratica: {
        type: Number
    },
    commissioniSchedaPratica: {
        type: Number
    },
    proprietarioSchedaPratica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'anagrafica'
    }
})

const SchedaPratica = mongoose.model('schedaPratica', schedaPraticaSchema);
module.exports = SchedaPratica;