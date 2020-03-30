const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const fileupload = require('express-fileupload');
// const normalizePort = require('normalize-port');

//Set up default mongoose connection
var mongoDB = `${process.env.DB_HOST}users?authSource=admin`;
// var mongoDB = 'mongodb://localhost:27017/users';//base de datos local
// var mongoDB = 'mongodb+srv://<user>:<password>@cluster0-srdla.mongodb.net/users?retryWrites=true&w=majority';//conexion remota MongoDB Atlas
mongoose.connect(
    mongoDB,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
    (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Success conected')
        }
    }
);

//Middleware
app.use(cors());
app.use(fileupload());
app.use(logger('dev'));//devuelve una respuesta por consola al hacer una peticion al servidor
app.use(cors());
app.use(express.json());//procesar los datos en formato json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../../dist')));
app.use(express.static(path.join(__dirname,'../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

//Routes variables
const rest = require('./routes/index');

//Routes
app.use('/api', rest);

const port = process.env.PORT || 8080;

// Not found error template
app.use(function(req, res, next) {
    // next(createError(404));
    res.status(404).sendFile(path.join(__dirname + '/views/notFound.html'));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});

module.exports = app;