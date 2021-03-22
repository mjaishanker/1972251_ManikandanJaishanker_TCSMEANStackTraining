let cart = [];

function onAddItem(el1, el2, el3){
    if(cart.length == 3){
        console.log("Log");
        alert("Cart Size is Full");
        return;
    }
    else{
        console.log(el1);
        console.log(el2);
        console.log(el3);
        let item = new Item();
        item.name = el1.innerText;
        item.price = parseInt(el2.innerText);
        cart.push(item);
        el3.innerText = cart.length;
        sessionStorage.setItem("cartInfo",JSON.stringify(cart));
    }
}

class Item {
    name:string;
    price:number;
}

function onLoadCartSession(){
    var obj = JSON.parse(sessionStorage.getItem("cartInfo"));
    console.log(obj);
    if(obj != null){
        for(let x in obj){
            cart.push(obj[x]);
        }
        document.getElementById("cartSize").innerText = cart.length.toString();
    }
}

function onLoadCheckSession(){
    var obj = JSON.parse(sessionStorage.getItem("cartInfo"));
    console.log(obj);
    if(obj != null){
        for(let x in obj){
            cart.push(obj[x]);
        }
    }

    onCheckoutTable();
}

function onCheckoutTable(){
    let totalVal:number = 0;

    for(let x in cart){
        let table = document.getElementById('cartDetails');
        let tableBody = table.getElementsByTagName("tbody")[0];
        let newRow = tableBody.insertRow(tableBody.rows.length);
        
        let cell1 = newRow.insertCell(0);
        cell1.setAttribute('scope', 'row');
        cell1.innerHTML = cart[x].name;

        let cell2 = newRow.insertCell(1);
        cell2.setAttribute('scope', 'row');
        cell2.innerHTML = "$" + cart[x].price;

        totalVal += cart[x].price;
    }
    document.getElementById('totalCartPrice').innerText = "$ " + totalVal.toString();
}