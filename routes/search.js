const express = require('express');
const router = express.Router();

//Get search page
router.get('/', function(req, res){
    res.render('search', {title: 'Search WIP'})
});


module.exports = router;