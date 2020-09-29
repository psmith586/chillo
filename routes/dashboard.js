const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/passport/isAuthenticated');
const listing = require('../models/listing');
const photo = require('../models/photos');
const amenities = require('../models/amenities');
const listings_amenities = require('../models/listings_amenities');
var amenitiesQuery;
var photoQuery;
var listings_amenitiesQuery;
//Get search page

router.get('/', isAuthenticated, (req, res) => {

    //console.log(req.user);
    const userEmail = req.user.email;
    
    resetFilters();

    photo.findAll()
        .then(photos => photoQuery = photos)
        .then(
            amenities.findAll({
                order: [["name", "ASC"]]
            })
                .then(amenities => amenitiesQuery = amenities)
        )
        .then(listings_amenities.findAll()
            .then(listings_amenities => listings_amenitiesQuery = listings_amenities)
        )
        .then(
            listing.findAll(
                {order: [['createdAt', 'DESC']]}
            )

                .then(listings => res.render('dashboard', { userEmail, amenitiesQuery_Listings: listings_amenitiesQuery,
                    amenitiesArray: amenities_arr, moreFilters_Amenities, amenities_query: amenitiesQuery, query: listings,
                    moreFilters_Stories, moreFilters_Stories_Max, moreFilters_SquareFeetMin, moreFilters_SquareFeetMax,
                    moreFilters_Distance, moreFilters_Parking, moreFilters_Pets, category_apartment, category_house, category_condo,
                    category_studio, category_other, filterPriceRange_Min, filterPriceRange_Max, searchItem, sell, rent,
                    sortBySelected, photoList: photoQuery, numOfBeds, numOfBaths}))
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
});

function resetFilters(){
    let searchItem = '';
    let sell = 1;
    let rent = 0;
    let sortBySelected = "createdAt";
    let numOfBeds = 1;
    let numOfBaths = 1;
    let filterPriceRange_Min = 0;
    let filterPriceRange_Max = 10000000;
    let category_apartment = 1;
    let category_house = 2;
    let category_condo = 3;
    let category_studio = 4;
    let category_other = 5;
    let moreFilters_Parking = 0;
    let moreFilters_Distance = 200;
    let moreFilters_Pets = -1;
    let moreFilters_Pets_Max = 100;
    let moreFilters_SquareFeetMin = 0;
    let moreFilters_SquareFeetMax = 999999;
    let moreFilters_Stories = 0;
    let moreFilters_Stories_Max = 200;
    let moreFilters_Amenities = "";
    let amenities_arr = new Array();
}

module.exports = router;