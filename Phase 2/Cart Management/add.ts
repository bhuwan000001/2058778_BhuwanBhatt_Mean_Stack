let mySet = new Set()
let cartSize:any
function add(itemName: string, price: string) {
    console.log(itemName, price);
    var list = JSON.parse(sessionStorage.getItem('items') || "[]");
    cartSize = parseInt(JSON.parse(sessionStorage.getItem('cartSize') || "0"));
    cartSize += 1;
    var item = {
        name: itemName,
        price: price
    };
    list.push(item);
    sessionStorage.setItem("items", JSON.stringify(list));
    sessionStorage.setItem("cartSize", JSON.stringify(cartSize));
    var data = document.getElementById("cartSize");
    if (data != null) {
        data.innerHTML = "<label>Cart Size: " + cartSize + "</label>";
    }
}
function checkout(){
    let tableContent = ""
    let startTable = "<table border=1 cellpadding=3 class='table'><tr><th>Item Name</th><th>Price</th></tr>"
    let totalPrice = 0;
    var list = JSON.parse(sessionStorage.getItem('items') || "[]");
    cartSize = parseInt(JSON.parse(sessionStorage.getItem('cartSize') || "0"));

    for (var i =0; i<cartSize;i++){
        let price = parseInt(list[i].price)
        tableContent += "<tr><td>" + list[i].name + "</td><td>" + list[i].price + "</td></tr>"
        totalPrice = totalPrice + price;
        
    };
    let endTable = "</table>"
    let tableData = document.getElementById("cartDetail");
    let total = document.getElementById("cartTotal");
    if(tableData != null){
        tableData.innerHTML = startTable + tableContent + endTable;
    }

    if(total != null){
        total.innerHTML = `Total Price: ${totalPrice}`;
    }

}
