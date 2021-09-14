
fetch('/fetchCourse')
.then( response => response.json())
.then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            var tableContent = "";
            var startTable = "<table border=1 cellpadding=3 class='table'><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>"
            //console.log(data);
            for(i = 0; i < data.length; i++){
                let courseID = data[i]._id;
                let courseName = data[i].courseName;
                let description = data[i].description;
                let amount = data[i].amount;

                tableContent += "<tr><td>" + courseID + "</td><td>" + courseName + "</td><td>" + description + "</td><td>" + amount + "</td></tr>"
            }
            
            var endTable = "</table>";
            tableContent = startTable + tableContent + endTable;
            document.getElementById("courseList").innerHTML = tableContent;
        }
    })
