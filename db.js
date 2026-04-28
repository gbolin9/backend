const mongoose = require('mongoose')
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 
mongoose.connect('mongodb+srv://gbolin_db_user:Passwordsdev255@songdb.uctqefl.mongodb.net/?appName=SongDB')

module.exports = mongoose

