let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

const fs = require('fs');
let callData = fs.readFileSync('call_data.json');  
let callDataFiles = JSON.parse(callData);  

console.log(callDataFiles); 

mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
if(!err1)
{
    let db = client.db("meanstack");
    db.collection("callData").insertMany(callDataFiles, (err2,result)=>{
        if(!err2){
            console.log(result.insertedCount);
        }else {
            console.log(err2.message);
        }
        client.close();  
    })  

}});