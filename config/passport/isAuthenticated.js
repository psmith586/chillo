/*
* Authentication
* 
* auth middleware for passport login
*  
*/

const isAuthenticated = (request, response, next) => {

  console.log('Hit Auth Middleware');
  //console.log(request);

  if (request.isAuthenticated()){
    console.log('Auth Success');
    console.log('User: ', request.user);
    next();
  }else{
    console.log('Not Authenticated');
    response.redirect(303, '/user/login');
  }
};

module.exports = isAuthenticated;