var markerArr_lat = new Array();
var markerArr_lng = new Array();
var markerArr_id = new Array();
var markerArr_addr = new Array();
var mapClicked = false;

function createMarkerArr(id, addr, lat, lng){
    //window.alert(typeof id + ", " + typeof addr + ", " + typeof lat + ", " + typeof lng);
    markerArr_id.push(id);
    markerArr_lat.push(lat);
    markerArr_lng.push(lng);
    markerArr_addr.push(addr);
}

function contactListing(listing_id, address, city, zipcode){
    document.getElementById('contactLabel_id').innerText = address + ", " + city + " " + zipcode;
    document.getElementById('listing_id').value = listing_id;
    if(!document.getElementById('contactOverlay').style.display || document.getElementById('contactOverlay').style.display == "none"){
        document.getElementById('contactOverlay').style.display = "block";
        document.getElementById('backgroundOverlayContact').style.display = "block";
    } else {
        document.getElementById('contactOverlay').style.display = "none";
        document.getElementById('backgroundOverlayContact').style.display = "none";
    }
}

function displayListing(listing_id){
    mapClicked = true;
    if(!document.getElementById('listingOverlay'+listing_id).style.display || document.getElementById('listingOverlay'+listing_id).style.display == "none"){
        document.getElementById('listingOverlay'+listing_id).style.display = "block";
        document.getElementById('backgroundOverlay'+listing_id).style.display = "block";
    } else {
        document.getElementById('listingOverlay'+listing_id).style.display = "none";
        document.getElementById('backgroundOverlay'+listing_id).style.display = "none";
    }

}

function setAmenity(ele){
    if (ele.classList.contains('active')) {
        ele.classList.remove('active');
        document.getElementById('moreFilters_Amenities').value = document.getElementById('moreFilters_Amenities').value.replace(ele.value + '\,', '');
    } else {
        ele.classList.add('active');
        document.getElementById('moreFilters_Amenities').value += ele.value + ",";
    }
    ele.blur();
}

function setNumOfStories(ele, num){
    var storiesFilters = document.getElementsByClassName('stories');
    for(var i = 0; i < storiesFilters.length; i++){
        storiesFilters[i].classList.remove('active');
    }
    ele.classList.add('active');
    document.getElementById('moreFilters_Stories').value = num;
}

function setNumOfPets_Numbers(ele, num){
    var petFilters_Numbers = document.getElementsByClassName('pet_Numbers');
    for(var i = 0; i < petFilters_Numbers.length; i++){
        petFilters_Numbers[i].classList.remove('active');
    }
    ele.classList.add('active');
    document.getElementById('moreFilters_Pets').value = num;
}

function setNumOfPets(ele, num){
    var petFilters = document.getElementsByClassName('pet');
    for(var i = 0; i < petFilters.length; i++){
        petFilters[i].classList.remove('active');
    }
    ele.classList.add('active');
    document.getElementById('moreFilters_Pets').value = num;

    var petFilters_Numbers = document.getElementsByClassName('pet_Numbers');
    if(num == 'Yes'){
        petFilters_Numbers[0].click();
        for(var i = 0; i < petFilters_Numbers.length; i++){
            petFilters_Numbers[i].classList.remove('disabled');
        }
    } else {
        for(var i = 0; i < petFilters_Numbers.length; i++){
            petFilters_Numbers[i].classList.add('disabled');
            petFilters_Numbers[i].classList.remove('active');
        }
    }
}

function setNumOfParking(ele, num){
    var parkingFilters = document.getElementsByClassName('parking');
    for(var i = 0; i < parkingFilters.length; i++){
        parkingFilters[i].classList.remove('active');
    }
    ele.classList.add('active');
    document.getElementById('moreFilters_Parking').value = num;
}

function setNumOfBeds(ele, num){
    var bedFilters = document.getElementsByClassName('beds');
    for(var i = 0; i < bedFilters.length; i++){
        bedFilters[i].classList.remove('active');
    }
    ele.classList.add('active');
    if(num == 'Any') num = 1;
    document.getElementById('numOfBeds').value = num;
    document.getElementById('filterBedBathLabel').innerHTML = num + '+ bd / ' + document.getElementById('numOfBaths').value + '+ ba';
}

function setNumOfBaths(ele, num){
    var bathFilters = document.getElementsByClassName('baths');
    for(var i = 0; i < bathFilters.length; i++){
        bathFilters[i].classList.remove('active');
    }
    ele.classList.add('active');
    if(num == 'Any') num = 1;
    document.getElementById('numOfBaths').value = num;
    document.getElementById('filterBedBathLabel').innerHTML = document.getElementById('numOfBeds').value + '+ bd / ' + num + '+ ba';
}

function updateSliders(type, price){
    updateSlider(type, price);
    updateSliderText(type, price);
    setFilterText_Price(type, price);
}

function updateSlider(type, price){
    if(type == 0){
        if(price == 'Any') {
            document.getElementById('priceSelected_Min').value = price;
        } else {
            document.getElementById('priceSelected_Min').value = Number(price).toLocaleString();
        }
    } else {
        if(price == 'Any'){
            document.getElementById('priceSelected_Max').value = price;
        } else {
            document.getElementById('priceSelected_Max').value = Number(price).toLocaleString();
        }
    }

    setFilterText_Price(type, price);
}

function updateSliderText(type, price){
    if(type == 0){
        document.getElementById('priceSlider_Min').value = price;
    } else {
        document.getElementById('priceSlider_Max').value = price;
    }
    setFilterText_Price(type, price);
}

function updateDistanceTextInput(distance){
    document.getElementById('distanceTextInput').value = distance;
}

function setFilterText_Price(type, price){
    if(type == 0){
        if(price == 'Any'){
            document.getElementById('priceSelectedValue_Min').value = price;
            document.getElementById('priceFilterButton_Min').textContent = 'Min Price: ' + price;
        } else {
            document.getElementById('priceSelectedValue_Min').value = price;
            document.getElementById('priceFilterButton_Min').textContent = 'Min Price: $' + Number(price).toLocaleString();
        }

    } else {
        if(price == 'Any'){
            document.getElementById('priceSelectedValue_Max').value = price;
            document.getElementById('priceFilterButton_Max').textContent = 'Max Price: ' + price;
        } else {
            document.getElementById('priceSelectedValue_Max').value = price;
            document.getElementById('priceFilterButton_Max').textContent = 'Max Price: $' + Number(price).toLocaleString();
        }
    }


}

function setSellRentFilter(){
    if (document.getElementById('rentCheckBox').checked && !document.getElementById('saleCheckBox').checked){
        document.getElementById('typeOfHousingButton').textContent = 'For Rent';
    } else if (!document.getElementById('rentCheckBox').checked && document.getElementById('saleCheckBox').checked){
        document.getElementById('typeOfHousingButton').textContent = 'For Sale';
    } else {
        document.getElementById('typeOfHousingButton').textContent = 'Sale/Rent';
    }
}

function resetFilters(){
    document.getElementById('searchListings').click();
}

function sortBy(val){
    document.getElementById('sortByValue').value = val;
    document.getElementById('filterButton_Search').click();
}

function isNumber(ele, event){
    ele.value = ele.value.replace(",", "");
    var keycode=event.keyCode;
    if(keycode>=48 && keycode<=57){
        return true;
    }
    return false;
}