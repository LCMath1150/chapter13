// first reference required modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
// for now, we will read a json file from public folder
const jsonPath = path.join(__dirname,  'paintings.json');
// get data using conventional Node callback approach
let paintings;
fs.readFile(jsonPath, (err,data) => {
    if (err)
	console.log('Unable to read json data file');
    else
	paintings = JSON.parse(data);
});

//Show html menu page for start request
app.get('/start', function(request, response)  {
    response.sendFile(__dirname + "/static/tester.html");

});

// return all the paintings when a root request arrives
app.get('/', (req,resp) => { resp.json(paintings) } );

// return just the requested painting
app.get('/:id', (req,resp) => {
    // get parameter
    const paintingId = req.params.id;
    // search the array of objects for a match
    const matches = paintings.filter(obj => paintingId == obj.paintingID);
    // return the matching painting
    resp.json(matches);
});

// return paintings whose gallery matches the supplied id
app.get('/gallery/:id', (req,resp) => {
    // get parameter
    const galleryId = req.params.id;
    // search the array of objects for a match
    const matches = paintings.filter(obj => galleryId == obj.gallery.galleryID);
    // return the matching companies
    resp.json(matches);
});

// return paintings whose artist id matches the supplied id 
app.get('/artist/:id', (req,resp) => {
    // get parameter
    const artistId = req.params.id;
    // search the array of objects for a match
    const matches = paintings.filter(obj => artistId == obj.artist.artistID);
    // return the matching companies
    resp.json(matches);
});

// return paintings created between two years
app.get('/year/:min/:max', (req,resp) => {
    // get parameters
    const minYear = req.params.min;
    const maxYear = req.params.max;
    // search the array of objects for a match
    const matches = paintings.filter(obj => (minYear <= obj.yearOfWork) && (maxYear >= obj.yearOfWork) );
    // return the matching companies
    resp.json(matches);
});

    // Use express to listen to port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);

});
