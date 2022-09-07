const Email = require('../models/emailModel');
const router = require('express').Router();

//* Inserimento Email
router.post('/insertEmail', async(req, res) => {
    try {
        const { email } = req.body;
        const newEmail = await Email.insertMany(email)
        res.status(200).json({ msg: 'Inserimento numero di telefono avvenuto con successo', newEmail })

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:`Problemi nell'inserimento`})
    }
})

module.exports = router;