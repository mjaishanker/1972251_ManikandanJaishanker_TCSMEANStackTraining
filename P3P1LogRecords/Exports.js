let obj = require("readline");
let r1 = obj.createInterface({
    input:process.stdin,
    output:process.stdout
});
var fs = require('fs');

function aquireUserLog(jsonLoc){

    r1.question("Enter the first name: ",(fname)=>{
        r1.question("Enter the last name: ", (lname)=> {
            r1.question("Enter the gender: ",(gender)=> {
                r1.question("Enter the email: ", (email)=> {
                    let timeRec = new Date();
                    let logNew = new Array();
                    logNew.push(fname);
                    logNew.push(lname);
                    logNew.push(gender);
                    logNew.push(email);
                    logNew.push(timeRec);
                    debugger;
                    console.log(logNew);
                    r1.close();
                    
                    if(jsonLoc.substring(jsonLoc.length - 5) == ".json" && jsonLoc.length > 5){
                        fs.readFile(jsonLoc, function (err, data) {
                            if (err) 
                                throw err
                    
                            var objs = JSON.parse(data);
                            objs.logRecords.push(logNew);
                            debugger;
                            fs.writeFile(jsonLoc, JSON.stringify(objs), 'utf-8', function(err) {
                                if (err) throw err;
                                debugger;
                                console.log('Done!');
                            })
                        });
                    }
                    else{
                        throw "File Location Not Valid";
                    }
                    
                })
            })
        })   
    })

}

module.exports={aquireUserLog}

