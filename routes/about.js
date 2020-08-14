let express = require('express');
let router = express.Router();

//Get search page
router.get('/', function(req, res){
    res.render('about', {title: 'About Team'})
});

module.exports = router;