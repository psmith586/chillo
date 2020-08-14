let express = require('express');
let router = express.Router();

//Get login page
router.get('/', function(req, res){
    res.render('unauthenticated/login', {title: 'Login WIP'})
});

/*router.post('/', function(req, res){
    res.render('unauthenticated/login', {title: 'posted'})
});*/

module.exports = router;