var projectBudgetArray = [];

function addProjectBudget(){
    console.log(projectBudgetArray);


    var clientProjectObj = {}    // empty object
    clientProjectObj.client = document.getElementById("clientName").value;
    clientProjectObj.project = document.getElementById("projectName").value;
    clientProjectObj.budget = document.getElementById("budget").value;
    
    const foundClient = projectBudgetArray.some(el => el.client === clientProjectObj.client);
    if(foundClient){ // client already exists in database
        const foundProject = projectBudgetArray.some(el => el.project === clientProjectObj.project);
        if(foundProject){
            //console.log("Client has project with same name");
            alert("Client has project with same name");
        }
        else{
            //totalBudget += parseInt(clientProjectObj.budget);
            projectBudgetArray.push(clientProjectObj);

            var stringProjArray = JSON.stringify(projectBudgetArray);
            console.log(stringProjArray);
            sessionStorage.setItem('ClientProjBudgets', projectBudgetArray);

            resetData();
            //console.log(projectBudgetArray);
        }
    }else{
        projectBudgetArray.push(clientProjectObj);

        var stringProjArray = JSON.stringify(projectBudgetArray);
        console.log(stringProjArray);
        sessionStorage.setItem('ClientProjBudgets', stringProjArray);
        //sessionStorage.setItem('ClientProjBudgets', projectBudgetArray);

        resetData();
        //console.log(projectBudgetArray);
    }

}

function resetData() {
    document.getElementById("clientName").value="";
    document.getElementById("projectName").value="";
    document.getElementById("budget").value = "";
    //displayData();
}



function displayData(){
    var totalBudget = 0;
    console.log("Displaying Data")
    var clientProjData = JSON.parse(sessionStorage.getItem('ClientProjBudgets'));
    console.log(clientProjData);
    console.log(clientProjData.length);
    
    for(x in clientProjData){
        var dataTable = document.getElementById("clientProjTable");
        var body = dataTable.getElementsByTagName("tbody")[0];
        var newRow = body.insertRow(body.length);
    
        var cell1 = newRow.insertCell(0);
        cell1.innerHTML = clientProjData[x].client; 

        var cell2 = newRow.insertCell(1);          // cell created 
        cell2.innerHTML = clientProjData[x].project; 
        
        var cell3 = newRow.insertCell(2);          // cell created 
        cell3.innerHTML = "$"+ numberWithCommas(parseInt(clientProjData[x].budget));
        totalBudget += parseInt(clientProjData[x].budget);
    }

    var dataTable = document.getElementById("clientProjTable");
    var body = dataTable.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);
    var cell4 = newRow.insertCell(0);
    cell4.innerHTML = "Total: ";
    var cell5 = newRow.insertCell(1);
    cell5.innerHTML = "";
    var cell6 = newRow.insertCell(2);
    cell6.innerHTML = "$" + numberWithCommas(totalBudget);

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function onPageLoad(){
    console.log("hello");
    console.log(projectBudgetArray);
    var clientProjData = JSON.parse(sessionStorage.getItem('ClientProjBudgets'));
    console.log(clientProjData);
    if(clientProjData != null){
        for(x in clientProjData){
            projectBudgetArray.push(clientProjData[x]);
        }
    }
    console.log(projectBudgetArray);
    console.log(projectBudgetArray.length);
}