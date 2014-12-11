//===================================
// Global Objects
//
//===================================
var express = require('express');
var app = express();
var path = require('path');

//===================================
// Setup Routes
//  No real routes are used, for later
//===================================

app.use(express.static(path.join(__dirname, 'public')));
require('./routes/routes.js')(app);

//===================================
// Setup Express and Exception Handler
//  WARNING, do not use this exception handler outside of testing environments
//===================================

app.listen(3000);
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
