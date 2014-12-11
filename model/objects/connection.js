//===============================
// Global Connection OBject
//  - inherited by ALL data objects
//===============================
var couchbase = require('couchbase');
var endPoint="10.21.16.121:8091";
var cluster = new couchbase.Cluster(endPoint);

var db = cluster.openBucket("user",function (err) {
    if (err) {
        console.log('=>DB CONNECTION ERR:', err);
    }
});

function create(key, item){
    db.upsert(key, item, function(err, result){
        if(err){
        }else {
        }
    });
}


//================================
// Export Objects
//
//================================
module.exports.db=db;
module.exports.endPoint=endPoint;
module.exports.db.create=create;


