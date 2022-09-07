const ContattiAzienda = require('../models/contattiAziendaModel');
const router = require('express').Router();

//* Inserimento ContattiAziendali
router.post('/insertContattiAzienda', async(req, res) => {
    try {
        const { contattiAzienda } = req.body;
        const newContattiAzienda = await ContattiAzienda.insertMany(contattiAzienda)
        res.status(200).json({ msg: `Inserimento contatto aziendale avvenuto con successo`, newContattiAzienda })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: `Problemi nell'inserimento` })
    }
})

module.exports = router;