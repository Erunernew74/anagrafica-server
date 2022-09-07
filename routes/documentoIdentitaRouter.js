const DocumentoIdentita = require('../models/documentoIdentitaModel');
const router = require('express').Router();

//* Inserimento documento d'identità
router.post('/insertDocumentoIdentita', async(req, res) => {
    try {
        const { documentoIdentita } = req.body;
        const newDocumentoIdentita = await DocumentoIdentita.insertMany(documentoIdentita)
        res.status(200).json({ msg: 'Inserimento numero di telefono avvenuto con successo', newDocumentoIdentita })
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:`Problemi nell'inserimento`})
    }
})

module.exports = router;