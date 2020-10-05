/**
 * Index Router/Search Feature
 * 
 * controls home page and search bar functionality
 */

const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const db = require('../db/index');
const listing = require('../models/listing');
const photo = require('../models/photos');
const amenities = require('../models/amenities');
const listings_amenities = require('../models/listings_amenities');
var amenitiesQuery;
var photoQuery;
var listings_amenitiesQuery;
let loggedIn = 'false';


function isLoggedIn(user){
    if(user === undefined) {
        return 'false';
    }else{
        return 'true';
    }
}

/*------- ELLIS MAP/LISTING CHANGES --------*/
/*var marker = '{lat: '+latitude_sfsu+',lng: '+longitude_sfsu+'}';
//CODE FOR GETTING DISTANCE FROM SFSU
var requestify = require('requestify'); 
var latitude_sfsu = "37.724276";
var longitude_sfsu = "-122.479955";
var latitude_dest = "38.72462182691737";
var longitude_dest = "-121.29990540098967";
var mode = "driving"; //driving, walking, bicycling, transit are options

var distanceReq = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+latitude_sfsu+','+longitude_sfsu+'&destinations='+latitude_dest+','+longitude_dest+'&mode='+mode+'&key=AIzaSyAHQWyWSop0909_XPZ9JSi2YT3G0Mr6jxA&callback';
requestify.get(distanceReq).then(function(res) {
    res.getBody();
    console.log(res.getBody()['rows'][0]['elements'][0]['distance']['text']);
});

let nodeGeocoder = require('node-geocoder');
let options = {
  provider: 'openstreetmap'
};
 

//CODE FOR GETTING MARKER COORDINATES
let geoCoder = nodeGeocoder(options);
geoCoder.geocode('801 Atherton Dr. Manteca CA 95337')
  .then((res)=> {
    marker = '{lat: '+res[0].latitude+',lng: '+res[0].longitude+'}';
    console.log(marker);
  })
  .catch((err)=> {
    console.log(err);
  });
/*------- ELLIS MAP/LISTING CHANGES --------*/





/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('req.user', JSON.stringify(req.user))
    loggedIn = isLoggedIn(req.user);
    console.log('loggedIn', loggedIn)

    try {
    db.authenticate();
  }catch(err){
    console.log(err)
  }
    resetFilters();


    photo.findAll()
        .then(photos => photoQuery = photos)
        /*.then(
            amenities.findAll({
                order: [["name", "ASC"]]
            })
                .then(amenities => amenitiesQuery = amenities)
        )
        .then(listings_amenities.findAll()
            .then(listings_amenities => listings_amenitiesQuery = listings_amenities)
        )*/
        .then(
            listing.findAll(
                {order: [['createdAt', 'DESC']]}
            )

                .then(listings => res.render('search', {/*amenitiesQuery_Listings: listings_amenitiesQuery,
                    amenitiesArray: amenities_arr, moreFilters_Amenities, amenities_query: amenitiesQuery,*/ query: listings,
                    moreFilters_Stories, moreFilters_Stories_Max, moreFilters_SquareFeetMin, moreFilters_SquareFeetMax,
                    moreFilters_Distance, moreFilters_Parking, moreFilters_Pets, category_apartment, category_house, category_condo,
                    category_studio, category_other, filterPriceRange_Min, filterPriceRange_Max, searchItem, sell, rent,
                    sortBySelected, photoList: photoQuery, numOfBeds, numOfBaths, loggedIn}))
                .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
});

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
let moreFilters_Distance = 200;
let moreFilters_Parking = 0;
let moreFilters_Pets = -1;
let moreFilters_Pets_Max = 100;
let moreFilters_SquareFeetMin = 0;
let moreFilters_SquareFeetMax = 999999;
let moreFilters_Stories = 0;
let moreFilters_Stories_Max = 200;
let moreFilters_Amenities = "";
let amenities_arr = new Array();

router.get('/listings', (req, res) => {
    resetFilters();


    photo.findAll()
        .then(photos => photoQuery = photos)
        /*.then(
            amenities.findAll({
                order: [["name", "ASC"]]
            })
                .then(amenities => amenitiesQuery = amenities)
            )
        .then(listings_amenities.findAll()
            .then(listings_amenities => listings_amenitiesQuery = listings_amenities)
        )*/
        .then(
            listing.findAll(
                {order: [['createdAt', 'DESC']]}
            )

            .then(listings => res.render('listings', {/*amenitiesQuery_Listings: listings_amenitiesQuery,
                amenitiesArray: amenities_arr, moreFilters_Amenities, amenities_query: amenitiesQuery,*/ query: listings,
                moreFilters_Stories, moreFilters_Stories_Max, moreFilters_SquareFeetMin, moreFilters_SquareFeetMax,
                moreFilters_Distance, moreFilters_Parking, moreFilters_Pets, category_apartment, category_house, category_condo,
                category_studio, category_other, filterPriceRange_Min, filterPriceRange_Max, searchItem, sell, rent,
                sortBySelected, photoList: photoQuery, numOfBeds, numOfBaths, loggedIn}))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
});

router.post('/search', (req, res) => {
    //moreFilters_Amenities = "";
    //amenities_arr = new Array();
    //moreFilters_Amenities = (req.body.moreFilters_Amenities !== undefined) ? req.body.moreFilters_Amenities : "";
    //amenities_arr = moreFilters_Amenities.split('\,');
    //console.log('\tFilter moreFilters_Amenities: ' + moreFilters_Amenities);

    moreFilters_Pets_Max = 100;
    moreFilters_Stories_Max = 200;
    moreFilters_Distance = (req.body.moreFilters_Distance !== undefined) ? req.body.moreFilters_Distance : 200;
    moreFilters_Parking = (req.body.moreFilters_Parking !== undefined) ? req.body.moreFilters_Parking : 0;
    moreFilters_Pets = (req.body.moreFilters_Pets !== undefined) ? req.body.moreFilters_Pets : -1;
    if(moreFilters_Pets == "Any") moreFilters_Pets = -1;
    if(moreFilters_Pets == "No") {
        moreFilters_Pets = 0;
        moreFilters_Pets_Max = 0;
    }
    if(moreFilters_Pets == "Yes") moreFilters_Pets = 1;
    moreFilters_SquareFeetMin = (req.body.moreFilters_SquareFeetMin !== undefined &&
        req.body.moreFilters_SquareFeetMin !== "") ? req.body.moreFilters_SquareFeetMin : 0;
    moreFilters_SquareFeetMax = (req.body.moreFilters_SquareFeetMax !== undefined &&
        req.body.moreFilters_SquareFeetMax !== "") ? req.body.moreFilters_SquareFeetMax : 999999;
    moreFilters_Stories = (req.body.moreFilters_Stories !== undefined) ? req.body.moreFilters_Stories : 0;
    if(moreFilters_Stories > 0 && moreFilters_Stories < 3) moreFilters_Stories_Max = moreFilters_Stories;
    if(moreFilters_Stories == 3) moreFilters_Stories = 2;


    let sortBy = req.body.navSortBy;

    sortBySelected = sortBy;
    if(sortBy=="price_high"){
        sortBy = "price";
        let sortByOrder = "DESC";
    } else if (sortBy=="price_low"){
        sortBy = "price";
        let sortByOrder = "ASC";
    } else if (sortBy=="distance"){
        sortBy = "distance";
        let sortByOrder = "ASC";
    } else {
        sortBy = "createdAt";
        let sortByOrder = "DESC";
    }

    //Change these values based on filter input
    numOfBeds = (req.body.numOfBeds !== undefined) ? req.body.numOfBeds : 1;
    numOfBaths = (req.body.numOfBaths !== undefined) ? req.body.numOfBaths : 1;

    filterPriceRange_Min = (req.body.filterPriceRange_Min !== undefined) ? req.body.filterPriceRange_Min : '0';
    filterPriceRange_Max = (req.body.filterPriceRange_Max !== undefined) ? req.body.filterPriceRange_Max : '10000000';
    if(filterPriceRange_Min == 'Any') filterPriceRange_Min = 0;
    if(filterPriceRange_Max == 'Any') filterPriceRange_Max = 10000000;
    //Get the value of sell/rent checkboxes in filters
    sell = "-1";
    rent = "-1";

    let element = req.body.housingType;
    if(element === undefined){
        sell = 1;
        rent = 0;
    } else {
        if(element != undefined && element.includes('0')){
            rent = 0;
        }
        if(element != undefined && element.includes('1')){
            sell = 1;
        }
    }

    category_apartment = (req.body.category_apartment !== undefined) ? req.body.category_apartment : -1;
    category_house = (req.body.category_house !== undefined) ? req.body.category_house : -1;
    category_condo = (req.body.category_condo !== undefined) ? req.body.category_condo : -1;
    category_studio = (req.body.category_studio !== undefined) ? req.body.category_studio : -1;
    category_other = (req.body.category_other !== undefined) ? req.body.category_other : -1;
    if(category_apartment == -1 && category_house == -1 && category_condo == -1
        && category_studio == -1 && category_other == -1) {
        category_apartment = 1;
        category_house = 2;
        category_condo = 3;
        category_studio = 4;
        category_other = 5;
    }

    searchItem = req.body.searchItem;
    if(searchItem == null){
        searchItem = req.body.searchBar;
        if(searchItem == null){
            searchItem = req.body.searchBarListing;
        }
    }


    photo.findAll()
        .then(photos => photoQuery = photos)
        /*.then(
            amenities.findAll({
                order: [["name", "ASC"]]
            })
                .then(amenities => amenitiesQuery = amenities)
        )
        .then(listings_amenities.findAll()
            .then(listings_amenities => listings_amenitiesQuery = listings_amenities)
        )*/
        .then(
            listing.findAll({
                where: {
                    [Op.or]: {
                        street_addr: {
                            [Op.like]: '%' + searchItem + '%'
                        },
                        city: {
                            [Op.like]: '%' + searchItem + '%'
                        },
                        zipcode: {
                            [Op.like]: '%' + searchItem + '%'
                        }
                    },
                    [Op.and]: {
                        //all of these filters
                        num_beds: {[Op.gte]: numOfBeds},
                        num_baths: {[Op.gte]: numOfBaths},
                        sell_rent: {
                            [Op.or]: [sell, rent]
                        },
                        category: {
                            [Op.or]: [category_apartment, category_house, category_condo, category_studio, category_other]
                        },
                        [Op.and]: [{price: {[Op.gte]: filterPriceRange_Min}}, {price: {[Op.lte]: filterPriceRange_Max}}],
                        parking: {[Op.gte]: moreFilters_Parking},
                        pets: {
                            [Op.and]: [{[Op.gte]: [moreFilters_Pets]}, {[Op.lte]: [moreFilters_Pets_Max]}]
                        },
                        square_ft: {
                            [Op.and]: [{[Op.gte]: [moreFilters_SquareFeetMin]}, {[Op.lte]: [moreFilters_SquareFeetMax]}]
                        },
                        stories: {
                            [Op.and]: [{[Op.gte]: [moreFilters_Stories]}, {[Op.lte]: [moreFilters_Stories_Max]}]
                        },
                        distance: {[Op.lte]: moreFilters_Distance},
                    },
                },
                order: [[sortBy, sortByOrder]]
            })

            .then(listings => res.render('listings', {/*amenitiesQuery_Listings: listings_amenitiesQuery, amenitiesArray: amenities_arr, moreFilters_Amenities, 
                amenities_query: amenitiesQuery,*/ query: listings, moreFilters_Stories, moreFilters_Stories_Max, moreFilters_SquareFeetMin, moreFilters_SquareFeetMax,
                moreFilters_Distance, moreFilters_Parking, moreFilters_Pets, category_apartment, category_house, category_condo, 
                category_studio, category_other, filterPriceRange_Min, filterPriceRange_Max, searchItem, sell, rent, 
                sortBySelected, photoList: photoQuery, numOfBeds, numOfBaths, loggedIn}))
            .catch(err => console.log(err)
            ) 
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