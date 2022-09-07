const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [`http://localhost:3000`],
    credentials: true,
    samesite: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(cookieParser())

const port = process.env.PORT || 5030

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.log(err)
    console.log('Connected to mongodb')
})

app.get('/', (req, res) => {
    res.json({msg: 'Bellissimo node.js'})
})

//* Rotta che gestisce la tabella anagrafica
const anagraficaRouter = require('./routes/anagraficaRouter');
app.use('/anagrafica', anagraficaRouter)

//* Rotta che gestisce la tabella contattiAzienda
const contattiAziendaRouter = require('./routes/contattiAziendaRouter');
app.use('/contattiAzienda', contattiAziendaRouter)

//* Rotta che gestisce la tabella documentoIdentita
const documentoIdentitaRouter = require('./routes/documentoIdentitaRouter')
app.use('/documentoIdentita', documentoIdentitaRouter)

//* Rotta che gestisce la tabella email
const emailRouter = require('./routes/emailRouter');
app.use('/email', emailRouter)

//* Rotta che gestisce la tabella eventi
const eventiRouter = require('./routes/eventiRouter');
app.use('/eventi', eventiRouter);

//* Rotta che gestisce l'inserimento di un numero di telefono
const numeriTelefonoRouter = require('./routes/numeriTelefonoRouter');
app.use('/numeriTelefono', numeriTelefonoRouter)

//* Rotta che gestisce l'inserimento dei prestiti
const prestitiEsistentiRouter = require('./routes/PrestitiEsistentiRouter');
app.use('/prestitiEsistenti', prestitiEsistentiRouter)

//* Rotta che gestisce la scheda pratica
const schedaPraticaRouter = require('./routes/schedaPraticaRouter')
app.use('/schedaPratica', schedaPraticaRouter)

app.listen(port, console.log(`Server in ascolto sulla porta ${port}`))