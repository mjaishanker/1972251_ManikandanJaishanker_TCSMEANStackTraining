var cart = [];
function onAddItem(el1, el2, el3) {
    if (cart.length == 3) {
        console.log("Log");
        alert("Cart Size is Full");
        return;
    }
    else {
        console.log(el1);
        console.log(el2);
        console.log(el3);
        var item = new Item();
        item.name = el1.innerText;
        item.price = parseInt(el2.innerText);
        cart.push(item);
        el3.innerText = cart.length;
        sessionStorage.setItem("cartInfo", JSON.stringify(cart));
    }
}
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
function onLoadCartSession() {
    var obj = JSON.parse(sessionStorage.getItem("cartInfo"));
    console.log(obj);
    if (obj != null) {
        for (var x in obj) {
            cart.push(obj[x]);
        }
        document.getElementById("cartSize").innerText = cart.length.toString();
    }
}
function onLoadCheckSession() {
    var obj = JSON.parse(sessionStorage.getItem("cartInfo"));
    console.log(obj);
    if (obj != null) {
        for (var x in obj) {
            cart.push(obj[x]);
        }
    }
    onCheckoutTable();
}
function onCheckoutTable() {
    var totalVal = 0;
    for (var x in cart) {
        var table = document.getElementById('cartDetails');
        var tableBody = table.getElementsByTagName("tbody")[0];
        var newRow = tableBody.insertRow(tableBody.rows.length);
        var cell1 = newRow.insertCell(0);
        cell1.setAttribute('scope', 'row');
        cell1.innerHTML = cart[x].name;
        var cell2 = newRow.insertCell(1);
        cell2.setAttribute('scope', 'row');
        cell2.innerHTML = "$" + cart[x].price;
        totalVal += cart[x].price;
    }
    document.getElementById('totalCartPrice').innerText = "$ " + totalVal.toString();
}
