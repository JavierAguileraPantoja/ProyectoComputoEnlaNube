require('dotenv').config();
const app = require('./server');
require('./databse');

//console.log(process.env.TESTING);

app.listen(app.get('port'),()=>{
    console.log('Servidor en Puerto',app.get('port'));
});