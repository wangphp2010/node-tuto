
const MongoClient = require('mongodb').MongoClient;

// 用来判定值是否有效 否则就报错
const assert = require('assert');

//connection url
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'blog';
 

MongoClient.connect(url, function(err,client){
  assert.equal(null,err); //判定err是否是null 否则报错
  console.log("Connected successfully to server") ;

  const db = client.db(dbName);

    db.collection("posts",function(err,collection){
     
        collection.find({tag:"game"}).toArray(function(err,docs){
            assert.equal(null,err);
            console.log(docs);
            client.close();
        });

  });  
 
  
});
