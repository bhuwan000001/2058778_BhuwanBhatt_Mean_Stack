function store(){
    if(localStorage.getItem('project'))
        {  
            projectArray = JSON.parse(localStorage.getItem('project')) 
        } 
        else {
            var projectArray = []; 
        }

    var details = document.getElementById("myform").elements;

    var projectDetail= {
        "ClientName":details[0].value,
        "ProjectName":details[1].value,
        "Budget":details[2].value
    }
    projectArray.push(projectDetail);
    localStorage.setItem('project', JSON.stringify(projectArray));
}
function display(){
    projects = JSON.parse(localStorage.getItem("project"));
    let tableContent = ""
    const startTable = "<table border=1 cellpadding=3 width=100% class='table'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
    let totalBudget = 0;
    for(i = 0;  i < projects.length; i++) {
        var clientName = projects[i].ClientName
        var projectName = projects[i].ProjectName
        var budget = projects[i].Budget
        if (clientName != "" && projectName != "" && budget != "") {
            totalBudget += parseInt(budget);
            tableContent += "<tr><td>" + clientName + "</td><td>" + projectName + "</td><td>" + budget + "</td></tr>"
        }
    }

    const end = "</table>"
    tableContent = startTable + tableContent + end
    document.getElementById("budgetInfo").innerHTML = tableContent;
    document.getElementById("budgetTotal").innerHTML = "<br><h3>Total budget is " + totalBudget + "</h3>";

}