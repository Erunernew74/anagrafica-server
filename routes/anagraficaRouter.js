const Anagrafica = require('../models/anagraficaModel');
const router = require('express').Router();
const ContattiAzienda = require('../models/contattiAziendaModel');
const DocumentoIdentita = require('../models/documentoIdentitaModel');
const Email = require('../models/emailModel');
const Eventi = require('../models/eventiModel');
const PrestitiEsistenti = require('../models/prestitiEsistentiModels')
const NumeriTelefono = require('../models/numeriTelefonoModels')
const SchedaPratica = require('../models/schedaPraticaModels')
const mongoose = require('mongoose');
const startOfDay = require('date-fns/startOfDay')
const endOfDay = require('date-fns/endOfDay')
const startOfDayAssunzione = require('date-fns/startOfDay')
const endOfDayAssunzione = require('date-fns/endOfDay')



//* Inserimento anagrafica
router.post('/insert', async (req, res) => {
    try {
        const {
            dataInserimento,
            nome,
            cognome,
            compleanno,
            capComuneNascita,
            comuneNascita,
            provNascita,
            genere,
            codiceFiscale,
            indirizzoResidenza,
            capResidenza,
            comuneResidenza,
            provResidenza,
            indirizzoDomicilio,
            capDomicilio,
            comuneDomicilio,
            provDomicilio,
            tipologiaLavoro,
            dataAssunzione,
            nomeAzienda,
            ragioneSocialeAzienda,
            numeroDipendentiAzienda,
            indirizzoAzienda,
            capAzienda,
            comuneAzienda,
            provAzienda,
            codiceFiscalePivaAzienda,
            note,
            contattiAzienda,
            numeriTelefono,
            email,
            eventi,
            documentoIdentita,
            prestitiEsistenti,
            schedaPratica,
        } = req.body;

        //* GESTIONE DELLE TABELLE ESTERNE
        const newContattiAzienda = await ContattiAzienda.insertMany(contattiAzienda);
        const newEmail = await Email.insertMany(email);
        const newEventi = await Eventi.insertMany(eventi);
        const newDocumentoIdentita = await DocumentoIdentita.insertMany(documentoIdentita);
        const newPrestitiEsistenti = await PrestitiEsistenti.insertMany(prestitiEsistenti)
        const newNumeriTelefono = await NumeriTelefono.insertMany(numeriTelefono);
        const newSchedaPratica = await SchedaPratica.insertMany(schedaPratica)

        const idContattiAzienda = [];
        const idEmail = [];
        const idEventi = [];
        const idDocumentoIdentita = [];
        const idPrestitiEsistenti = [];
        const idNumeriTelefono = [];
        const idSchedaPratica = [];

        newContattiAzienda.forEach((e) => idContattiAzienda.push(e._id));
        newEmail.forEach((e) => idEmail.push(e._id));
        newEventi.forEach((e) => idEventi.push(e._id));
        newDocumentoIdentita.forEach((e) => idDocumentoIdentita.push(e._id));
        newPrestitiEsistenti.forEach((e) => idPrestitiEsistenti.push(e._id));
        newNumeriTelefono.forEach((e) => idNumeriTelefono.push(e._id))
        newSchedaPratica.forEach((e) => idSchedaPratica.push(e._id))
        //* FINE GESTIONE DELLE TABELLE ESTERNE

        const newAnagrafica = new Anagrafica({
            dataInserimento,
            nome,
            cognome,
            compleanno,
            capComuneNascita,
            comuneNascita,
            provNascita,
            genere,
            codiceFiscale,
            indirizzoResidenza,
            capResidenza,
            comuneResidenza,
            provResidenza,
            indirizzoDomicilio,
            capDomicilio,
            comuneDomicilio,
            provDomicilio,
            tipologiaLavoro,
            dataAssunzione,
            nomeAzienda,
            ragioneSocialeAzienda,
            numeroDipendentiAzienda,
            indirizzoAzienda,
            capAzienda,
            comuneAzienda,
            provAzienda,
            codiceFiscalePivaAzienda,
            note,
            contattiAzienda: idContattiAzienda,
            email: idEmail,
            eventi: idEventi,
            documentoIdentita: idDocumentoIdentita,
            prestitiEsistenti: idPrestitiEsistenti,
            numeriTelefono: idNumeriTelefono,
            schedaPratica: idSchedaPratica
        })

        const { id } = await newAnagrafica.save();
        res.status(200).json({ msg: `Inserimento avvenuto con successo`, newAnagrafica, id })

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: `Problemi nell'inserimento del dato` })
    }
})

//* Rotta che gestisce la visione dei dati delle tabelle
router.get('/contatti', async (req, res) => {
    const allContatti = await Anagrafica.find().populate([
        "contattiAzienda",
        "email",
        "eventi",
        "documentoIdentita",
        "prestitiEsistenti",
        "numeriTelefono",
        "schedaPratica"
    ]).sort({ nome: "asc", cognome: "asc" });
    res.json(allContatti)

})

//* Rotta per vedere un utente specifico quando apriamo la pagina e con lop useEffect si caricano i suoi dati
router.get('/contatto/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allContatti = await Anagrafica.find({ _id: id })
            .populate([
                "contattiAzienda",
                "email",
                "eventi",
                "documentoIdentita",
                "prestitiEsistenti",
                "numeriTelefono",
                "schedaPratica"
            ])
        res.json(allContatti)
    } catch (error) {
        console.log(error)
        res.statusMessage(400).json({ msg: `Problemi nella visualizzazione del contatto` })
    }
})

//* Rotta per eseguire l'update di uno specifico utente
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            dataInserimento,
            nome,
            cognome,
            compleanno,
            capComuneNascita,
            comuneNascita,
            provNascita,
            genere,
            codiceFiscale,
            indirizzoResidenza,
            capResidenza,
            comuneResidenza,
            provResidenza,
            indirizzoDomicilio,
            capDomicilio,
            comuneDomicilio,
            provDomicilio,
            tipologiaLavoro,
            dataAssunzione,
            nomeAzienda,
            ragioneSocialeAzienda,
            numeroDipendentiAzienda,
            indirizzoAzienda,
            capAzienda,
            comuneAzienda,
            provAzienda,
            codiceFiscalePivaAzienda,
            note,
            contattiAzienda,
            email,
            eventi,
            documentoIdentita,
            prestitiEsistenti,
            numeriTelefono,
            schedaPratica
        } = req.body;

        //* Settiamo la ricerca dell'utente
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ msg: `Utente non trovato` })

        //* Effettuiamo l'update della tabella anagrafica    
        const anagraficaUpdate = await Anagrafica.findByIdAndUpdate(
            { _id: id },
            {
                dataInserimento,
                nome,
                cognome,
                compleanno,
                capComuneNascita,
                comuneNascita,
                provNascita,
                genere,
                codiceFiscale,
                indirizzoResidenza,
                capResidenza,
                comuneResidenza,
                provResidenza,
                indirizzoDomicilio,
                capDomicilio,
                comuneDomicilio,
                provDomicilio,
                tipologiaLavoro,
                dataAssunzione,
                nomeAzienda,
                ragioneSocialeAzienda,
                numeroDipendentiAzienda,
                indirizzoAzienda,
                capAzienda,
                comuneAzienda,
                provAzienda,
                codiceFiscalePivaAzienda,
                note,
            },
            { new: true }
        )

        //* POSSO FARE L'UPDATE SOLO DI ALCUNI CAMPI PER EVITARE CHE L'UTENTE POSSA CAMBIARE QUALCOSA
        //* Gestione tabella contattiAzienda
        contattiAzienda.forEach(async (e) => {
            if (e._id) {
                await ContattiAzienda.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        tipologiaContattoAzienda: e.tipologiaContattoAzienda,
                        specificaContattoAzienda: e.specificaContattoAzienda,
                        personaRiferimentoAzienda: e.personaRiferimentoAzienda,
                        noteContattiAzienda: e.noteContattiAzienda
                    },
                    { new: true }
                )
            } else {
                const newContattiAzienda = await ContattiAzienda({
                    tipologiaContattoAzienda: e.tipologiaContattoAzienda,
                    specificaContattoAzienda: e.specificaContattoAzienda,
                    personaRiferimentoAzienda: e.personaRiferimentoAzienda,
                    noteContattiAzienda: e.noteContattiAzienda
                })
                const { id: idContattiAzienda } = await newContattiAzienda.save();
                await Anagrafica.updateOne({
                    _id: id,
                },
                    {
                        $push: { contattiAzienda: idContattiAzienda }
                    }
                )
            }
        })

        //* Gestione tabella email
        email.forEach(async (e) => {
            if (e._id) {
                await Email.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        indirizzoEmail: e.indirizzoEmail,
                        noteEmail: e.noteEmail
                    },
                    { new: true }
                );
            } else {
                const newEmail = await Email({
                    indirizzoEmail: e.indirizzoEmail,
                    noteEmail: e.noteEmail
                })
                const { id: idEmail } = await newEmail.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { email: idEmail } }
                )
            }
        })

        //* Gestione tabella eventi => Posso evitare di metterla perché non ci sono suoi campi nella ricerca
        eventi.forEach(async (e) => {
            if (e._id) {
                await Eventi.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        dataEvento: e.dataEvento,
                        tipologiaEvento: e.tipologiaEvento,
                        noteEvento: e.noteEvento
                    },
                    { new: true }
                )
            } else {
                const newEvento = await Eventi({
                    dataEvento: e.dataEvento,
                    tipologiaEvento: e.tipologiaEvento,
                    noteEvento: e.noteEvento
                })
                const { id: idEvento } = await newEvento.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { eventi: idEvento } }
                )
            }
        })

        //* Gestione tabella documentoIdentita => Posso evitare di metterla perché non ci sono suoi campi nella ricerca
        documentoIdentita.forEach(async (e) => {
            if (e._id) {
                await DocumentoIdentita.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        tipologiaDocumentoIdentita: e.tipologiaDocumentoIdentita,
                        numeroDocumentoIdentita: e.numeroDocumentoIdentita,
                        dataRilascio: e.dataRilascio,
                        dataScadenza: e.dataScadenza,
                        enteRilascio: e.enteRilascio
                    },
                    { new: true }
                )
            } else {
                const newDocumentoIdentita = await DocumentoIdentita({
                    tipologiaDocumentoIdentita: e.tipologiaDocumentoIdentita,
                    numeroDocumentoIdentita: e.numeroDocumentoIdentita,
                    dataRilascio: e.dataRilascio,
                    dataScadenza: e.dataScadenza,
                    enteRilascio: e.enteRilascio
                })
                const { id: idDocumentoIdentita } = await newDocumentoIdentita.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { documentoIdentita: idDocumentoIdentita } }
                )
            }
        })

        //* Gestione tabella prestitiEsistenti
        prestitiEsistenti.forEach(async (e) => {
            if (e._id) {
                await PrestitiEsistenti.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        tipologiaPrestiti: e.tipologiaPrestiti,
                        importoRata: e.importoRata,
                        dataInizio: e.dataInizio,
                        dataScadenza: e.dataScadenza,
                        ritardiPrestito: e.ritardiPrestito,
                        enteErogatore: e.enteErogatore,
                        notePrestito: e.notePrestito
                    },
                    { new: true }
                );
            } else {
                const newPrestitoEsistente = await PrestitiEsistenti({
                    tipologiaPrestiti: e.tipologiaPrestiti,
                    importoRata: e.importoRata,
                    dataInizio: e.dataInizio,
                    dataScadenza: e.dataScadenza,
                    ritardiPrestito: e.ritardiPrestito,
                    enteErogatore: e.enteErogatore,
                    notePrestito: e.notePrestito
                })
                const { id: idPrestitoEsistente } = await newPrestitoEsistente.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { prestitiEsistenti: idPrestitoEsistente } }
                )
            }
        })

        //* Gestione tabella numeriTelefono
        numeriTelefono.forEach(async (e) => {
            if (e._id) {
                await NumeriTelefono.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        tipologiaNumeroTelefono: e.tipologiaNumeroTelefono,
                        numeroTelefono: e.numeroTelefono,
                        proprietaNumeroTelefono: e.proprietaNumeroTelefono,
                        noteNumeroTelefono: e.noteNumeroTelefono
                    },
                    { new: true }
                )
            } else {
                const newNumeroTelefono = await NumeriTelefono({
                    tipologiaNumeroTelefono: e.tipologiaNumeroTelefono,
                    numeroTelefono: e.numeroTelefono,
                    proprietaNumeroTelefono: e.proprietaNumeroTelefono,
                    noteNumeroTelefono: e.noteNumeroTelefono
                })
                const { id: idNumeroTelefono } = await newNumeroTelefono.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { numeriTelefono: idNumeroTelefono } }
                )
            }
        })

        //* Gestione tabella schedaPratica => Posso evitare di metterla perché non ci sono suoi campi nella ricerca
        schedaPratica.forEach(async (e) => {
            if (e._id) {
                await SchedaPratica.findByIdAndUpdate(
                    { _id: e._id },
                    {
                        dataSchedaPratica: e.dataSchedaPratica,
                        esitoSchedaPratica: e.esitoSchedaPratica,
                        enteErogatoreSchedaPratica: e.enteErogatoreSchedaPratica,
                        importoRataSchedaPratica: e.importoRataSchedaPratica,
                        durataMesiSchedaPratica: e.durataMesiSchedaPratica,
                        montanteSchedaPratica: e.importoRataSchedaPratica * e.durataMesiSchedaPratica,
                        percentualeCommissioniSchedaPratica: e.percentualeCommissioniSchedaPratica,
                        commissioniSchedaPratica: ((e.percentualeCommissioniSchedaPratica * e.montanteSchedaPratica) / 100).toFixed(2)
                    },
                    { new: true }
                )
            } else {
                const newSchedaPratica = await SchedaPratica({
                    dataSchedaPratica: e.dataSchedaPratica,
                    esitoSchedaPratica: e.esitoSchedaPratica,
                    enteErogatoreSchedaPratica: e.enteErogatoreSchedaPratica,
                    importoRataSchedaPratica: e.importoRataSchedaPratica,
                    durataMesiSchedaPratica: e.durataMesiSchedaPratica,
                    montanteSchedaPratica: e.montanteSchedaPratica,
                    percentualeCommissioniSchedaPratica: e.percentualeCommissioniSchedaPratica,
                    commissioniSchedaPratica: e.commissioniSchedaPratica
                })
                const { id: idSchedaPratica } = await newSchedaPratica.save();
                await Anagrafica.updateOne(
                    { _id: id },
                    { $push: { schedaPratica: idSchedaPratica } }
                );
            }
        })

        res.status(200).json({ msg: `Aggiornamento avvenuto con successo` })

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: `Problemi nell'update` })
    }
})

//* ROTTA CHE GESTISCE LA RICERCA
router.post('/search', async (req, res) => {
    //* Nel body metto i campi di tutte le tabelle che voglio prendere in considerazione
    const {
        nome,
        cognome,
        capComuneNascita,
        comuneNascita,
        provNascita,
        genere,
        codiceFiscale,
        indirizzoResidenza,
        capResidenza,
        comuneResidenza,
        provResidenza,
        indirizzoDomicilio,
        capDomicilio,
        comuneDomicilio,
        provDomicilio,
        tipologiaLavoro,
        nomeAzienda,
        ragioneSocialeAzienda,
        numeroDipendentiAzienda,
        indirizzoAzienda,
        capAzienda,
        comuneAzienda,
        provAzienda,
        codiceFiscalePivaAzienda,
        note,
        startDate,//* Per la data di nascita
        endDate, //* Per la data di nascita
        startDateAssunzione, //* Per la data di assunzione
        endDateAssunzione, //* Per la data di assunzione
        tipologiaContattoAzienda,
        specificaContattoAzienda,
        personaRiferimentoAzienda,
        indirizzoEmail,
        tipologiaNumeroTelefono,
        numeroTelefono
    } = req.body;



    //* Inserisco i campi della tabella anagrafica 
    //* Non inserisco le date perché non devono essere customizzate
    let options = {
        nome: new RegExp(nome, 'i'),
        cognome: new RegExp(cognome, 'i'),
        genere: new RegExp(genere, 'i'),
        comuneNascita: new RegExp(comuneNascita, 'i'),
        capComuneNascita: new RegExp(capComuneNascita, 'i'),
        provNascita: new RegExp(provNascita, 'i'),
        codiceFiscale: new RegExp(codiceFiscale, 'i'),
        indirizzoResidenza: new RegExp(indirizzoResidenza, 'i'),
        comuneResidenza: new RegExp(comuneResidenza, 'i'),
        capResidenza: new RegExp(capResidenza, 'i'),
        provResidenza: new RegExp(provResidenza, 'i'),
        indirizzoDomicilio: new RegExp(indirizzoDomicilio, 'i'),
        capDomicilio: new RegExp(capDomicilio, 'i'),
        comuneDomicilio: new RegExp(comuneDomicilio, 'i'),
        provDomicilio: new RegExp(provDomicilio, 'i'),
        tipologiaLavoro: new RegExp(tipologiaLavoro, 'i'),
        nomeAzienda: new RegExp(nomeAzienda, 'i'),
        ragioneSocialeAzienda: new RegExp(ragioneSocialeAzienda, 'i'),
        indirizzoAzienda: new RegExp(indirizzoAzienda, 'i'),
        note: new RegExp(note, 'i'),
        capAzienda: new RegExp(capAzienda, 'i'),
        comuneAzienda: new RegExp(comuneAzienda, 'i'),
        provAzienda: new RegExp(provAzienda, 'i'),
        codiceFiscalePivaAzienda: new RegExp(codiceFiscalePivaAzienda, 'i'),
    }

    //* Creiamo la ricerca fra due date della tabella Anagrafica
    if (startDate && endDate) {
        options.compleanno = {
            $gte: startOfDay(new Date(startDate)),
            $lte: endOfDay(new Date(endDate))
        }
    } else {
        if (startDate)
            options.compleanno = {
                $gte: startOfDay(new Date(startDate)),
            }

        if (endDate)
            options.compleanno = {
                $lte: endOfDay(new Date(endDate))
            }
    }

    //* Creiamo la ricerca fra due date per la data di assunzione
    if (startDateAssunzione && endDateAssunzione) {
        options.dataAssunzione = {
            $gte: startOfDayAssunzione(new Date(startDateAssunzione)),
            $lte: endOfDayAssunzione(new Date(endDateAssunzione))
        }
    } else {
        if (startDateAssunzione)
            options.dataAssunzione = {
                $gte: startOfDayAssunzione(new Date(startDateAssunzione))
            }
        if (endDateAssunzione)
            options.dataAssunzione = {
                $lte: endOfDayAssunzione(new Date(endDateAssunzione))
            }
    }

    //* GESTIONE RICERCA IN UN CAMPO CON CARATTERI SPECIALI
    //* In questo caso vogliamo fare delle ricerche se un numero di dipendenti è maggiore minore o compreso tra due numeri
    //* <N >N N-N
    if (numeroDipendentiAzienda) {//* è il campo che prendiamo in considerazione
        if (numeroDipendentiAzienda.includes('<')) {
            let n = numeroDipendentiAzienda.split('<')
            console.log(numeroDipendentiAzienda, n)
            options.numeroDipendentiAzienda = {
                $lte: numeroDipendentiAzienda.split('<')[1],
            }
        }
        if (numeroDipendentiAzienda.includes('>')) {
            options.numeroDipendentiAzienda = {
                $gte: numeroDipendentiAzienda.split('>')[1],
            }
        }

        if (numeroDipendentiAzienda.includes('-')) {
            const range = numeroDipendentiAzienda.split('-');
            options.numeroDipendentiAzienda = {
                $gte: range[0],
                $lte: range[1]
            }
        }


    }

    //* i risultati della ricerca anagrafica popolati con le altre tabelle li mettiamo dentro alla costante ris
    let ris = await Anagrafica.find(options).populate([
        'contattiAzienda',
        'documentoIdentita',
        'email',
        'eventi',
        'numeriTelefono',
        'prestitiEsistenti',
        'schedaPratica'
    ])


    //* Qui gestisco le tabella esterne e i campi che mi interessano per tabella
    //* Dico che il body non deve essere un oggetto vuoto
    if (req.body != {}) {

        //* NEL PRIMO IF METTO TUTTI I CAMPI DELLE ALTRE TABELLE CHE CONSIDERO NEL FORM CERCA
        if (tipologiaContattoAzienda || specificaContattoAzienda || personaRiferimentoAzienda || indirizzoEmail || tipologiaNumeroTelefono || numeroTelefono) {
            ris = ris.filter(({ contattiAzienda, email, numeriTelefono }) => {//* FILTRO LE TABELLE CHE PRENDO IN CONSIDERAZIONE
                let isValid = false
                //* CAMPI DELLA TABELLA contattiAzienda
                if (tipologiaContattoAzienda || specificaContattoAzienda || personaRiferimentoAzienda) {
                    contattiAzienda.forEach(e => {
                        if (e.tipologiaContattoAzienda.toLowerCase().includes(tipologiaContattoAzienda) || e.specificaContattoAzienda.toLowerCase().includes(specificaContattoAzienda) || e.personaRiferimentoAzienda.toLowerCase().includes(personaRiferimentoAzienda)) {
                            isValid = true
                        }
                    })
                }

                //*CAMPI DELLA TABELLA email
                if (indirizzoEmail) {
                    email.forEach(e => {
                        if (e.indirizzoEmail.includes(indirizzoEmail)) {
                            isValid = true
                        }
                    })
                }
                console.log(req.body)

                //*CAMPI DELLA TABELLA numeriTelefono
                if (tipologiaNumeroTelefono || numeroTelefono) {
                    numeriTelefono.forEach(e => {
                        if (e.tipologiaNumeroTelefono.includes(tipologiaNumeroTelefono) || e.numeroTelefono.includes(numeroTelefono)) {
                            isValid = true
                        }
                    })
                }
                return isValid
            })
        }

    }
    res.status(200).json({ ris })

})


module.exports = router;