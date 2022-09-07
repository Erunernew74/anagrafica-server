//* Questo è il file per la registrazione e login come model generale

const mongoose = require('mongosse');

const userSchema = new mongoose.Schema({
    
})

const User = mongoose.model('user', userSchema);
module.exports = User;