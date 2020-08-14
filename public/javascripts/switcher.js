function switcher(input) {
    console.log(input)

    d1 = document.getElementById('switcher');
    d2 = document.getElementById('messages');
    d3 = document.getElementById('posted-listings');
    d4 = document.getElementById('profile');

    if( input === 'messages' )
    {
        d1.style.display = "none";
        d2.style.display = "block";
        d3.style.display = "none";
        d4.style.display = "none";

    }
    else if(input === 'profile')
    {
        d1.style.display = "none";
        d2.style.display = "none";
        d3.style.display = "none";
        d4.style.display = "block";

    }else if(input === 'posted-listings')
    {
        d1.style.display = "none";
        d2.style.display = "none";
        d3.style.display = "block";
        d4.style.display = "none";

    }else{
        window.alert('FAIL')
    }
}