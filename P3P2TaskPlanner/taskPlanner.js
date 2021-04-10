let http = require("http");
let url = require("url");
let port = 9999;
let employeeID = "";
let taskNameID = "";
let task = "";
let deadlineDate = "";
let fs = require('fs');
let tasksArrayInfo = new Array();
let employeetaskArray = new Array();

let taskStoreInfo = 
`
    <h2>Add Task</h2><br/>    
    <form action="/store" method="get">
        <label>Employee ID: </label>
        <input type="text" name="empID"/><br/>
        <label>Task ID: </label>
        <input type="text" name="taskID"/><br/>
        <label>Task: </label>
        <input type="text" name="taskName"/><br/>
        <label>Deadline: </label>
        <input type="date" name="taskDate" min="2021-01-01" max="2021-12-31"/><br/>
        <input type="submit" value="Submit"/>
        <input type="reset" value="reset"/>
    </form>
`

let deleteTaskInfo = 
`
    <h2>Delete Task</h2><br/> 
    <form action="/delete" method="get">

        <label>Task ID: </label>
        <input type="text" name="taskID"/><br/>
        <input type="submit" value="Submit"/>
        <input type="reset" value="reset"/>
    </form>
`


let server = http.createServer((req,res)=> {
    if(req.url != "/favicon.ico"){
        console.log(url.parse(req.url,true))
        var pathInfo = url.parse(req.url,true).pathname;
        if(req.url=="/start"){
            res.setHeader("content-type","text/html");  // by default data consider as a html 
            
            let taskData = url.parse(req.url,true).query;
            
            tasksArrayInfo.find(t => {
                if(t.taskNameID == data.taskID){
                    res.send("taskId is invalid");
                }
                else{
                    res.send("taskId is valid");
                    fs.readFile("tasks.json", function (err, data) {
                        if (err) 
                            throw err
                
                        var objs = JSON.parse(data);
                        objs.taskLogs.push(taskData);
                        
                        fs.writeFile("tasks.json", JSON.stringify(objs), 'utf-8', function(err) {
                            if (err) throw err;
                            
                            console.log('Done!');
                        })
                    });
                }
            })
            
            res.write(taskStoreInfo);
            res.write(deleteTaskInfo);
            fs.readFile("tasks.json", function (err, data) {
                if (err) 
                    throw err
                var objs = JSON.parse(data);
                //objs.taskLogs.push(newTask);
                for(let i of objs.taskLogs){
                    employeeID = i.empID;
                    taskNameID = i.taskID;
                    task = i.taskName;
                    deadlineDate = i.taskDate;
                    console.log(i);
                    //console.log(displayTasks);
                }
                
            });
            res.end(`
            <h2>List Tasks</h2><br/> 
            <table id="tableID">
                <tr>
                    <th>Employee ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
                <tbody>
                <tr>
                    <td id="tableEmpID">${employeeID}</td>
                    <td id="tableTaskID">${taskNameID}</td>
                    <td id="tableTask">${task}</td>
                    <td id="tableDeadline">${deadlineDate}</td>
                </tr>
                </tbody>    
            </table> 
        
        `);
            
        }
        else if(pathInfo=="/store"){
            res.setHeader("content-type","text/html");
            res.write(taskStoreInfo);
            res.write("Successfully Added!");
            res.write(deleteTaskInfo);


            fs.readFile("tasks.json", function (err, data) {
                if (err) 
                    throw err
                var objs = JSON.parse(data);
                //objs.taskLogs.push(newTask);
                for(let i of objs.taskLogs){
                    employeeID = i.empID;
                    taskNameID = i.taskID;
                    task = i.taskName;
                    deadlineDate = i.taskDate;
                    console.log(employeeID);
                }
                
            });

            // fs.readFile("tasks.json",(err,data)=> {
            //     if(!err){
            //         //console.log(data.toString());
            //         let tasksString = data.toString()
            //         let tasksJson = JSON.parse(tasksString);
            //         employeeID = tasksJson.empID;
            //         taskNameID = tasksJson.taskID;
            //         task = tasksJson.taskName;
            //         deadlineDate = tasksJson.taskDate;
            //         // console.log("id is "+empJson.id);
            //         // console.log("name is "+empJson.name);
            //         // console.log("salary is "+empJson.salary);
            //     }
            // })


            res.end(`
            <h2>List Tasks</h2><br/> 
            <table id="tableID">
                <tr>
                    <th>Employee ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
                <tbody>
                <tr>
                    <td id="tableEmpID">${employeeID}</td>
                    <td id="tableTaskID">${taskNameID}</td>
                    <td id="tableTask">${task}</td>
                    <td id="tableDeadline">${deadlineDate}</td>
                </tr>
                </tbody>    
            </table> 
        
        `);
            var taskData = url.parse(req.url,true).query;
            //res.write(taskData);
            /* let tempTaskEmpID = taskData.empID;
            let tempTaskTaskID = taskData.taskID;
            let tempTaskTaskName = taskData.taskName;
            let tempTaskTaskDate = taskData.taskDate; */

            // let newTask = new Array();
            
            // newTask.push({"empID": tempTaskEmpID, "taskID": tempTaskTaskID, "taskName": tempTaskTaskName, "taskDate": tempTaskTaskDate});


            // let jsonData = JSON.stringify(newTask);
            fs.readFile("tasks.json", function (err, data) {
                if (err) 
                    throw err
                var objs = JSON.parse(data);
                
                objs.taskLogs.push({"empID": taskData.empID, "taskID":  taskData.taskID, "taskName": taskData.taskName, "taskDate": taskData.taskDate});
                //let json = JSON.stringify(objs);
                //fs.writeFile("tasks.json", json);
                fs.writeFile("tasks.json",  JSON.stringify(objs), 'utf-8', function(err) {
                    if (err) throw err;
                    console.log('Done!');
                })
            });
            
            res.end();
        }
        else if(pathInfo=="/delete"){
            res.setHeader("content-type","text/html");
            res.write(taskStoreInfo);
            res.write("Successfully Deleted!");
            res.write(deleteTaskInfo);


            fs.readFile("tasks.json", function (err, data) {
                if (err) 
                    throw err
                var objs = JSON.parse(data);
                //objs.taskLogs.push(newTask);
                for(let i of objs.taskLogs){
                    employeeID = i.empID;
                    taskNameID = i.taskID;
                    task = i.taskName;
                    deadlineDate = i.taskDate;
                    console.log(employeeID);
                }
                
            });

            res.end(`
                <h2>List Tasks</h2><br/> 
                <table id="tableID">
                    <tr>
                        <th>Employee ID</th>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Deadline</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td id="tableEmpID">${employeeID}</td>
                        <td id="tableTaskID">${taskNameID}</td>
                        <td id="tableTask">${task}</td>
                        <td id="tableDeadline">${deadlineDate}</td>
                    </tr>
                    </tbody>    
                </table> 
        
            `);
            var taskData = url.parse(req.url,true).query;

            fs.readFile("tasks.json", function (err, data) {
                if (err) 
                    throw err
                var objs = JSON.parse(data);
                let flag = 0;
                let j = 0;
                objs.taskLogs.find((t, i) => {
                    let tID = t.taskID;
                    if(tID == taskData.taskID){
                        j=i;
                        flag++;
                        //break;
                    }
                })
                if(flag==0){
                    res.send("TaskId is invalid")
                }else {
                        objs.taskLogs.splice(j,1);  // 1st parameter index, number records.
                        res.send("Task deleted successfully....")
                }
                //.push({"empID": taskData.empID, "taskID":  taskData.taskID, "taskName": taskData.taskName, "taskDate": taskData.taskDate});
                //let json = JSON.stringify(objs);
                //fs.writeFile("tasks.json", json);
                fs.writeFile("tasks.json",  JSON.stringify(objs), 'utf-8', function(err) {
                    if (err) throw err;
                    console.log('Done!');
                })
            });
            
            res.end();
        }
    }
})
server.listen(port,()=>console.log(`running on port num ${port}`));
