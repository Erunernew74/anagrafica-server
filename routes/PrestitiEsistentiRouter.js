const PrestitiEsistenti = require('../models/prestitiEsistentiModels');
const router = require('express').Router();

//* Inserimento prestiti 
router.post('/insertPrestitiEsistenti', async(req, res) => {
    try {
        const { prestitiEsistenti } = req.body;
        const newPrestitiEsistenti = await PrestitiEsistenti.insertMany(prestitiEsistenti); 
        res.status(200).json({ msg: `Inserimento numero di telefono avvenuto correttamente`, newPrestitiEsistenti })      
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg:`Problemi nell'inserimento dei numeri di telefono` })
    }
})

module.exports = router;
