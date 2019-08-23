const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const fs = require('fs');
const path = ('path');


router.get('/', function(req, res, next) {
  res.sendFile('index', { title: 'Silly Statistics' });
});

module.exports = router;


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
