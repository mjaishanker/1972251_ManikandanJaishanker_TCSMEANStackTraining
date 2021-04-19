let app = require("express")();
let fs = require('fs');
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

let bodyParser = require("body-parser");
// enable body part data
app.use(bodyParser.urlencoded({extended:true}));    
//app.use(bodyParser.json())  // enable json data.

let port=9099;

let courseArrayInfo = new Array();

app.get("/",(req,res)=>{
    //console.log(__dirname)
    //console.log(__dirname+"/login.html")
    res.sendFile(__dirname+"/main.html");
})

app.post("/addCourse",(req,res)=>{
    req.body = null;
    res.sendFile(__dirname+"/aCourse.html");
});

app.post("/courseAdded", (req, res) => {
    fs.readFile("courses.json", function (err, data) {
        if (err) 
            throw err
        var objs = JSON.parse(data);

        let flag = 0;
        let j = 0;
        objs.courses.find((t, i) => {
            let courID = t.CId;
            if(courID == req.body.CId){
                j=i;
                flag++;
                //break;
            }
        })

        if(flag == 0){
            objs.courses.push({"CId": req.body.CId, "CName":  req.body.CName, "CDes": req.body.CDes, "CAmt": req.body.CAmt});
            fs.writeFile("courses.json",  JSON.stringify(objs), 'utf-8', function(err) {
                if (err) throw err;
                console.log('Done!');
            });

            res.send("Successfully Added");

            mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                    if(!err1)
                    {
                        let db = client.db("meanstack");
                        db.collection("coursesMongo").drop();
                        db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount);
                            }else {
                                console.log(err2.message);
                            }
                            client.close();  
                        })  
            
                    }
                    else{
                        console.log("Error is " + err);
                        client.close();
                    }
                }
            );
        }
        else {
            res.send("Course Id Already Exists");
            mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                    if(!err1)
                    {
                        let db = client.db("meanstack");
                        db.collection("coursesMongo").drop();
                        db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount);
                            }else {
                                console.log(err2.message);
                            }
                            client.close();  
                        })  
            
                    }
                    else{
                        console.log("Error is " + err);
                        client.close();
                    }
                }
            );
        }
    });
    
})

app.post("/updateCourse",(req,res)=>{
    req.body = null;
    res.sendFile(__dirname+"/uCourse.html");
});

app.post("/courseUpdated",(req,res)=> {
    //res.sendFile(__dirname+"/uCourse.html");
    fs.readFile("courses.json", function (err, data) {
        if (err) 
            throw err
        var objs = JSON.parse(data);

        let flag = 0;
        objs.courses.find(c => {
            if(c.CId == req.body.CId){
                c.CAmt = req.body.CAmt
                flag++;
            }
        })

        if(flag==0){
            res.send("Course Id is invalid");

            // mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
            //         if(!err1)
            //         {
            //             let db = client.db("meanstack");
            //             db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
            //                 if(!err2){
            //                     console.log(result.insertedCount);
            //                 }else {
            //                     console.log(err2.message);
            //                 }
            //                 client.close();  
            //             })  
            
            //         }
            //     }
            // );

        }else {
            
            fs.writeFile("courses.json",  JSON.stringify(objs), 'utf-8', function(err) {
                if (err) throw err;
                console.log('Update Done!');
            });
            res.send("Course Amount updated successfully...");
            
            mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                    if(!err1)
                    {
                        let db = client.db("meanstack");
                        db.collection("coursesMongo").drop();
                        db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount);
                            }else {
                                console.log(err2.message);
                            }
                            client.close();  
                        })  
            
                    }
                }
            );
        }
    });
})

app.post("/deleteCourse",(req,res)=>{
    req.body = null;
    res.sendFile(__dirname+"/dCourse.html");
});

app.post("/courseDeleted",(req,res)=> {
    //res.sendFile(__dirname+"/uCourse.html");
    fs.readFile("courses.json", function (err, data) {
        if (err) 
            throw err
        var objs = JSON.parse(data);

        let flag = 0;
        let j = 0;

        objs.courses.find((c, i) => {
            if(c.CId == req.body.CId){
                j = i;
                flag++;
            }
        })

        if(flag==0){
            res.send("Course Id is invalid");

            /* mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                    if(!err1)
                    {
                        let db = client.db("meanstack");
                        db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount);
                            }else {
                                console.log(err2.message);
                            }
                            client.close();  
                        })  
            
                    }
                }
            ); */

        }else {
            objs.courses.splice(j,1);
            fs.writeFile("courses.json",  JSON.stringify(objs), 'utf-8', function(err) {
                if (err) throw err;
                console.log('Delete Done!');
            });
            res.send("Course Amount deleted successfully...");

            mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                    if(!err1)
                    {
                        let db = client.db("meanstack");
                        db.collection("coursesMongo").drop();
                        db.collection("coursesMongo").insertMany(objs.courses, (err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount);
                            }else {
                                console.log(err2.message);
                            }
                            client.close();  
                        })  
            
                    }
                }
            );

        }

    });
})

app.get("/fetchCourse",(req,res)=>{
    req.body = null;
    //res.json("courses.json");
    fs.readFile("courses.json", function (err, data) {
        if (err) 
            throw err
        var objs = JSON.parse(data);
        res.json(objs.courses);
    });

    //res.sendFile(__dirname+"/fCourse.html");

});

app.listen(port,()=>console.log(`Server running on port number ${port}`));