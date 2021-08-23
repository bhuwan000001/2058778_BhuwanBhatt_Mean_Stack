function checkout() {
    var list = JSON.parse(sessionStorage.getItem('items') || "[]");
    var tableContent = "";
    var startTable = "<table border=1 cellpadding=3 class='table'><tr><th>Item Name</th><th>Price</th></tr>";
    var totalPrice = 0;
    for (var i = 0; i < list.length; i++) {
        tableContent += "<tr><td>" + list[i].name + "</td><td>" + list[i].price + "</td></tr>";
        totalPrice += parseInt(list[i].price);
    }
    var endTable = "</table>";
    var tableData = document.getElementById("cartDetail");
    var total = document.getElementById("cartTotal");
    if (tableData != null) {
        tableData.innerHTML = startTable + tableContent + endTable;
    }
    if (total != null) {
        total.innerHTML = "Total Price: " + totalPrice;
    }
}