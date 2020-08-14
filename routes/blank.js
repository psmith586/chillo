'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function(request, response){
    response.render('blank');
});

module.exports = router;