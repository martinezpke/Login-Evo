const express = require('express');
const config = require('./config/conf');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();



//initialization
const app = express();
require('./db/connection');
app.use(cors());
app.use(cookieParser());


//settings
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Middlewares
app.use(express.urlencoded({extended: true}));

//Routes
app.use(require('./routes/index'));

//Static files
app.use('/resources', express.static(__dirname + '/public'));

//Server is listenning
app.listen(app.get('port'), () =>{
    console.log(`Server on http://localhost:${app.get('port')}`)
})