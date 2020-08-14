'use strict';
const express = require('express');
const router = express.Router();


router.get('/', function(request, response){
    function loggedIn(req, res, next) {
        if (req.user) {
            return true
        } else {
            return false
        }
    }
});

module.exports = router;