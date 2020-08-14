let express = require('express');
let router = express.Router();

//Get search page
router.get('/', function(req, res){
    res.render('listings', {title: 'Listings WIP'})
});

module.exports = router;