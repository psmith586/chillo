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
    searchItem = '';
    sell = 1;
    rent = 0;
    sortBySelected = "createdAt";
    numOfBeds = 1;
    numOfBaths = 1;
    filterPriceRange_Min = 0;
    filterPriceRange_Max = 10000000;
    category_apartment = 1;
    category_house = 2;
    category_condo = 3;
    category_studio = 4;
    category_other = 5;
    moreFilters_Parking = 0;
    moreFilters_Distance = 200;
    moreFilters_Pets = -1;
    moreFilters_Pets_Max = 100;
    moreFilters_SquareFeetMin = 0;
    moreFilters_SquareFeetMax = 999999;
    moreFilters_Stories = 0;
    moreFilters_Stories_Max = 200;
    moreFilters_Amenities = "";
    amenities_arr = new Array();
}

module.exports = router;