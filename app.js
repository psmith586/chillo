const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);


//for use of environment variables in dev/test
if(process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}

//app build/dependencies
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//database

require('./db/index');

//maintain login sessions
app.use(session({ 
  store: new MemoryStore({
  checkPeriod: 86400000 
  }),
  secret: 'ssssh', 
  resave: false, 
  saveUninitialized: false
}));

/*app.use(session({ 
  secret: 'ssssh',
  resave: false, 
  saveUninitialized: false  
}));*/

app.use(passport.initialize());
app.use(passport.session());

//routing
const indexRouter = require('./routes/index');
const userProfileRouter = require('./routes/profile');
const aboutRouter = require('./routes/about');
const searchRouter = require('./routes/search');
const dashboardRouter = require('./routes/dashboard');
const blankRouter = require('./routes/blank');
const userRouter = require('./routes/user');
const apiRouter = require('./routes/api');

app.use('/', indexRouter);
app.use('/profile', userProfileRouter);
app.use('/about', aboutRouter);
app.use('/search', searchRouter);
app.use('/dashboard', dashboardRouter);
app.use('/user', userRouter);
app.use('/blank', blankRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
