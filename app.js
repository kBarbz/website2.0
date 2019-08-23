const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.static(__dirname + '/public'));


  function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
        	
            const object = JSON.parse(fileData);
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}

let bedford;
jsonReader('./public/images/bedfordJSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    bedford = team;
})

let bm1;
jsonReader('./public/images/bayswater1JSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    bm1 = team;
})

let bm2;
jsonReader('./public/images/bayswater2JSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    bm2 = team;
})

let bm3;
jsonReader('./public/images/bayswater3JSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    bm3 = team;
})

let f1;
jsonReader('./public/images/fremantle1JSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    f1 = team;
})

let f2;
jsonReader('./public/images/fremantle2JSON.json', (err, team) => {
    if (err) {
        console.log(err)
        return
    }
    f2 = team;
})


app.get('/teamName', function(req,res){
    console.log('GET request received for teamName');
    let whichTeam = Object.keys(req.query)
    switch(whichTeam[0]) {
        case 'Bedford':
        res.send(bedford);
        break;
        case 'Bayswater Morley 1':
        res.send(bm1);
        break;
        case 'Bayswater Morley 2':
        res.send(bm2);
        break;
        case 'Bayswater Morley 3':
        res.send(bm3);
        break;
        case 'Fremantle 1':
        res.send(f1);
        break;
        case 'Fremantle 2':
        res.send(f2); 
        break;
    }

    
})

app.listen(port, function(){
	console.log("Server is running on port " + port);
});
