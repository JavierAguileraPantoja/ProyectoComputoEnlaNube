const mongoose = require('mongoose');
//const MONGODB_URI = process.env.MONGODB_URI;

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DB } = process.env;

//const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
//const NOTES_APP_MONGODB_DB = process.env.NOTES_APP_MONGODB_DB;

const MONGODB_URI = `${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DB}`
mongoose.connect(MONGODB_URI)
    .then(db => console.log('MONGO ONLINE'))
    .catch(err => console.log(err));