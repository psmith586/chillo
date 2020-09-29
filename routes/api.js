/* 
 * API
 *
 * Perform database CRUD operations for all site functionality 
*/
const express = require('express');
const router = express.Router();
const listing = require('../models/listing');
const photo = require('../models/photos');
const message = require('../models/message');
const user = require('../models/user');
const upload = require('../db/images'); 
const singleUpload = upload.any('upload_file');
const uploadArray = upload.array('photos', 3);
const hashTool = require('../config/passport/helpers');
const passport = require('../config/passport');
const isAuthenticated = require('../config/passport/isAuthenticated');

//helpers
//check if email is from sfsu
const verifySFSU = (email) => {
  let sfsuEmail = 'sfsu.edu';
  if(email.includes(sfsuEmail)){ return 1; }
  return 0;
};

//listing operations
router.post('/create_listing', isAuthenticated, (req, res) => {

    singleUpload(req, res, function(err){

      //console.log(JSON.stringify(req.body));
      //console.log(req.files[0])

      try {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        }
        else if (!req.files) {
          return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
          return res.send(err);
        }
        else if (err) {
          return res.send(err);
        }
      }catch (err) {
        console.log('NOTWORKING')

      }

      const newListing = {
        lister_uid: req.user.uid,
        street_addr: req.body.street_addr,
        city: req.body.city,
        zipcode: req.body.zipcode,
        price: req.body.price,
        num_beds: 3,
        num_baths: 3,
        square_ft: 2500,
        parking: 1,
        pets: 1,
        description: req.body.description,
        approved: 0,
        sell_rent: req.body.sell_rent,
        category: req.body.category,
        stories: 2
      };
  
      //console.log('Listing Info:\n', newListing);
      //console.log('\nImage Info:\n', image);

      listing.create(newListing)
        .then(data => {
        
          const image = {
            listing_id: data.listing_id,
            uid: data.lister_uid,
            image_url: req.files[0].location,
            main_photo: 1
          };

          photo.create(image)
            .catch(err => { console.log(err); });

          res.render('dashboard', { postMessage: true });
      })
      .catch(err => { 
        console.log(err); 
      
      });
    });
});

//upload photo array
router.post('/uploadPhotos', (req, res) => {
  uploadArray(req, res, function(err){

    const { user } = req.user;
    const listing_id = req.body.listing_id;

    try {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      }
      else if (!req.files) {
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      }
    }catch (err) {
      console.log('NOTWORKING')
    }

    let newImage;
    let imageArray = [];

    req.files.forEach(image => {
      
      newImage = {
        listing_id: listing_id,
        uid: user.uid,
        image_url: image.location,
        main_photo: 0
      };

      imageArray.push(newImage);

    });

    photo.bulkCreate(imageArray)
      .then(data => { res.send(data); })
      .catch(err => { console.log(err); });

  });
});

//edit listings
router.post('/editListing', (req, res) => {
  
  let listingID = req.body.listing_id;

  //all int fields => dbField: field ? field:0
  const price = req.body.price;
  let num_beds = req.body.num_beds ? req.body.num_beds : 1;
  let num_baths = req.body.num_baths ? req.body.num_baths : 1;
  let square_ft = req.body.square_ft ? req.body.square_ft : 0;
  let parking = req.body.parking ? req.body.parking : 0;
  let pets = req.body.pets ? req.body.pets:0;
  let stories = req.body.stories ? req.body.stories:1;

  
  listing.findOne({
    where: {
      listing_id: listingID
    }
  })
    .then(listing => {
      listing.price = price;
      listing.num_beds = num_beds;
      listing.num_baths = num_baths;
      listing.square_ft = square_ft;
      listing.parking = parking;
      listing.pets = pets;
      listing.stories = stories;

      listing.save();
    })
    .catch(error => { console.log(error); });
});

//get all listings for user
router.post('/userListings', (req, res) => {
  
  const uid = req.user.uid;

  listing.findAll({
    where: {
      lister_uid: uid
    }
  })
    .then(listings => {
      res.json(listings);
    })
    .catch(err => { console.log(err) });
});

//add amenities

//user operations
router.post('/register', (req, res) => {
  console.log(JSON.stringify(req.body));
  const newUser = { 
  //uid: req.body.uid,
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  password: hashTool.generateHash(req.body.password),
  sfsu_verified: verifySFSU(req.body.email),
  permission: 1
  };

  console.log(newUser);

  user.create(newUser) 
    .then(data => {res.redirect('/user/login'); })
    .catch(err => {res.send(err); });
});

//delete message
router.post('/deleteMessage', (req,res) => {
  let msg_id = req.body.msg_id
  message.destroy({
    where: {
      msg_id: msg_id
    }
  })
    .then(data => { res.send(data); })
    .catch(error => { console.log(error); });
});

//display messages (for user)
router.get('/userMessages', (req, res) => {
  console.log('inUserMessages')
  const userID = req.user.uid; 

  message.findAll({
    where: {
      recipient_id: userID
    }
  })
    .then(message => res.render('dashboard', {query: message}))
    .catch(err => { console.log(err); });
});

//delete listing
router.post('/listing', (req,res) => {
  let listing_id = req.body.listing_id
  listing.destory(
    {
      where:{
        listing_id: listing_id
      }
    })
    .catch(error => { console.log('Error deleting listing'); });
});

//login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

//logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logOut();
  res.redirect('/');
});

//messaging
router.post('/message', (req,res) =>{
  
  //res.send(req.body);
  const listingID = parseInt(req.body.listing_id);
  const senderID = req.user.uid;
  //const messageText = req.body.msg_txt;

  listing.findOne({ 
    where: {
      listing_id: listingID
    } 
  })
    .then(listing => {

      message.create(
        {
          sender_id: senderID,
          recipient_id: listing.lister_uid,
          listing_id: listingID,
          msg_text: req.body.msg_txt
        })
        .then(data => {
          //res.send(data);
          res.redirect(303, '/');
        })
        .catch(err => { console.log(err); });
    })
    .catch(err => {
      res.send(err);
    });
 });

 //reset password
 router.post('/reset', (req, res) => {
   const { user } = req.user;
   const oldPassword = req.body.oldPassword;
   const newPassword = req.body.newPassword;

   //find user by id
   user.findOne({
     where: {
       uid: user.uid
     }
   })
    .then(user => {
      if(hashTool.validatePassword(user.password, oldPassword)){
        user.password = hashTool.generateHash(newPassword);
        user.save();
      }else{
        res.send('incorrect old password')
      };
    })
    .catch(error => { console.log(error); });
 });

module.exports = router;