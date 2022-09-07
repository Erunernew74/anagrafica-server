const NumeriTelefono = require('../models/numeriTelefonoModels');
const router = require('express').Router();

//* Inserimento numeri di Telefono
router.post('/insertNumeriTelefono', async(req, res) => {
    try {
        const { numeriTelefono } = req.body;
        const newNumeriTelefono = await NumeriTelefono.insertMany(numeriTelefono);
        res.status(200).json({ msg:`Inserimento numero di telefono avvenuto con successo`, newNumeriTelefono })        
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: `Problemi nell'inserimento del numero di telefono`})
    }
})

module.exports = router;