const express = require('express');
const router = express.Router();
const fs = require('fs'); 

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

let baseball;
router.get('/', function(req, res, next) {
jsonReader('./public/images/baseballJSON.json', (err, data ) => {
    if (err) {
        console.log(err)
        return
    }
    baseball = data;
})
res.send(baseball);
});

module.exports = router;