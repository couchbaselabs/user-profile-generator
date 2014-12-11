//====================================
// Variables
//
//====================================
var http=require('http');
var connection = require('./objects/connection');
var faker = require('faker');

var endPoint=connection.endPoint;
var testInterval=100;
var testBatch=25000;
var threshold=1000000;

//====================================
// Main Functional Loop
//  Fires at repeated interval
//====================================
setInterval(function () {
        checkOps(function(done){
            console.log(done);
            if (parseInt(done, 10) < threshold) {
                loadTextUserProfile(testBatch);
                console.log("INGEST:Added:",testBatch);
            }
            else {
                console.log("INGEST:Busy:", done);
            }
        });
    }, testInterval
);

//====================================
// Check Ops/Sec
//  Queries an endpoint and used for throttling
//====================================
function checkOps(opsV) {
    http.get("http://" + endPoint + "/pools/default/buckets/user", function (res) {
        var data="";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end',function(){
                var parsed=JSON.parse(data);
                opsV(parsed.basicStats.opsPerSec);
            });
        });
}

//====================================
// Load User Profile Data
//  Uses Faker to generate fake User
//  Batch Level is Configurable
//====================================
function loadTextUserProfile(limit){
    for(i=0;i<limit;i++){
        var u=faker.helpers.userCard();
        connection.db.create(u.email,u);
    }
}
