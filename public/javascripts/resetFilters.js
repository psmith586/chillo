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