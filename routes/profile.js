'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
let position, name, url, bio;

router.get('/', function(request, response){
    url = './resources/images/eddy.jpg'
    response.render('user_profile', {url})
});

router.get('/daniel-belmeur', function(request, response){
    url = '../resources/images/user-images/daniel_photo.jpg';
    position = 'Front-End Lead Developer';
    name = 'Daniel Belmeur';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

router.get('/sean-ellis', function(request, response){
    url = '../resources/images/user-images/sean_photo.jpg';
    position = "Front-End Developer";
    name = 'Sean Ellis';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

router.get('/valdemar-puente-gonzalez', function(request, response){
    url = '../resources/images/user-images/vlad_photo.jpg';
    position = "Team Lead";
    name = 'Valdemar Puente-Gonzalez';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

router.get('/phillip-smith', function(request, response){
    url = '../resources/images/user-images/phillip_photo.jpg';
    position = "Back-End Lead Developer";
    name = 'Phillip Smith';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

router.get('/salah-ali', function(request, response){
    url = '../resources/images/user-images/salah_photo.jpg';
    position = "Back-End Developer";
    name = 'Salah Ali';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

router.get('/karan-gurung', function(request, response){
    url = '../resources/images/user-images/karan_photo.jpg';
    position = "Github Master";
    name = 'Karan Gurung';
    readFile(name).then( () =>{
        response.render('user_profile', {url, position, name, bio})
    })
});

function readFile(name){
     return new Promise((resolve) =>{
        let modifiedName = name.split(" ");
        let modifiedURL = './public/resources/bios/' + modifiedName[0].toLocaleLowerCase() + '_bio.txt';

        fs.readFile(modifiedURL, (err, data) => {
            console.log("Modified URL in readFile: " + modifiedURL)
            if (err) throw err;
            bio = data;
        }); setTimeout(resolve, 2) // This timeout is here inorder to give the promise time to resolve
    })
}


module.exports = router;