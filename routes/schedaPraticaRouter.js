const SchedaPratica = require('../models/schedaPraticaModels');
const router = require('express').Router();

router.post('/insertSchedaPratica', async(req, res) => {
    try {
        const { schedaPratica } = req.body;
        const newSchedaPratica = await SchedaPratica.insertMany(schedaPratica)
        res.status(200).json({ msg: `Inserimento scheda avvenuto con successo`, newSchedaPratica })
    } catch (error) {
        console.log(error)
        res.status(400).json({  msg: `Problemi nell'inserimento scheda` })
    }
})



module.exports = router;