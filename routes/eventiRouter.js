const Eventi = require('../models/eventiModel');
const router = require('express').Router();

//* Inserimento eventi
router.post('/insertEventi', async(req, res) => {
    try {
        const { eventi } = req.body;
        const newEventi = await Eventi.insertMany(eventi)
        res.status(200).json({ msg: 'Inserimento numero di telefono avvenuto con successo', newEventi })

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:`Problemi nell'inserimento`})
    }
})

module.exports = router;