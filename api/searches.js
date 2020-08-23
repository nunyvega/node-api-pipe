const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const searches = require('../Searches');
const https = require('https');

// Search from the homepage
router.get('/', (req, res) => {
  let urlValue = req.query.keyword;
  let todo = '';
  let theUrl = '';
  let newValue = {};
  newValue.keyword = urlValue;
https.get(`https://public-api.wordpress.com/rest/v1.1/read/tags/${urlValue}/posts?number=1`, (response) => {


// called when a data chunk is received.
response.on('data', (chunk) => {
  todo += chunk;
});

// called when the complete response is received.
response.on('end', () => {
  theUrl =  JSON.parse(todo).posts[0].URL; 
  newValue.url = theUrl;
  searches.unshift(newValue);
  res.redirect('/');
  
});

}).on("error", (error) => {
console.log("Error: " + error.message);
})
})




// Search using GET directly on URL
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    let todo = '';
    let theUrl = '';
https.get(`https://public-api.wordpress.com/rest/v1.1/read/tags/${req.params.id}/posts?number=1`, (response) => {
  

  // called when a data chunk is received.
  response.on('data', (chunk) => {
    todo += chunk;
  });

  // called when the complete response is received.
  response.on('end', () => {
    console.log(todo);
    theUrl =  JSON.parse(todo).posts[0].URL; 
    res.json(theUrl)
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
})

});



module.exports = router;