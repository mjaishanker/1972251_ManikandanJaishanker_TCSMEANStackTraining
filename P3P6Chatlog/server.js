let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);

let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";


app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/chatHtml.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    
    socket.on("chat",(msg)=> {
        console.log(msg);
        mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1)
                {
                    let db = client.db("meanstack");
                    //db.collection("chatlog").drop();
                    db.collection("chatlog").insertOne(msg, (err2,result)=>{
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
    })
})
http.listen(9096,()=>console.log('server running on port number 9096'));