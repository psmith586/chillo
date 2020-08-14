let express = require('express');
let router = express.Router();

//Get search page
router.get('/login', function(req, res){
    res.render('unauthenticated/login', {title: 'Login WIP'})
});

router.get('/register', function(req, res){
    res.render('unauthenticated/register', {title: 'Register WIP'})
});

module.exports = router;