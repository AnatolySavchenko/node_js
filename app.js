const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const todoRouter = require('./routes/todos');
const connectDB = require('./database/db');

const app = express();

app.use(logger('dev'));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


app.use(cors());
app.use('/todo', todoRouter);

app.use(function (req, res, next) {
	next(404);
});

app.use(function (err, req, res, next){
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

app.listen(5000);
