let http = require("http");
let url = require("url");
let fs = require("fs");



let taskList;

try {
    taskList = JSON.parse(fs.readFileSync("task.json").toString());
} catch (e) {
    taskList = [];
}

let addTask = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Add Task</h2>
    <form action="addTaskRoute">
        <label>Employee Id: </label>
        <input type="text" name="employeeId"/><br/>
        <label>Task Id: </label>
        <input type="text" name="taskId"/><br/>
        <label>Task : </label>
        <input type="text" name="task"/><br/>
        <label>Deadline : </label>
        <input type="date" name="date"/><br/>
        <input type="submit" value="Add Task"/> 
    </form>
    <hr>
    <a href="viewTask">View Task</a>
    <a href="deleteTask">Delete Task</a>
</body>
</html>
`
let deleteTaskForm = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTaskRoute">
        <label>Task Id: </label>
        <input type="text" name="taskId"/><br/>
        <input type="submit" value="Delete Task"/> 
    </form>
    <hr>
    <a href="viewTask">View Task</a>
</body>
</html>

`
let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url, true);
    //console.log(urlInfo);
    if (urlInfo.pathname != "/favicon.ico") {
        if (urlInfo.pathname == "/addTaskRoute") {
            let taskObj = urlInfo.query;
            //console.log(taskObj);
            let result = taskList.find(task => task.taskId == taskObj.taskId);
            response.writeHead(200, { "content-type": "text/html" });
            if (result == undefined) {
                taskList.push(taskObj);
                fs.writeFileSync("task.json", JSON.stringify(taskList));

                //console.log(taskList);
                response.write("<p>Task added sucessfully!</p><br><a href='viewTask'>View Task</a>");
            } else {
                //console.log("not undefined");
                response.write("TaskId needs to be unique!");
                response.write(addTask);
            }
        } else if (urlInfo.pathname == "/viewTask") {
            //console.log(taskList);
            let tableContent = "";
            let startTable = `
            <table border = 1>
            <tr>
                <th>Employee Id</th>
                <th>Task Id</th>
                <th>Task</th>
                <th>Deadline</th>
            </tr>
            `
            for (data of taskList) {
                tableContent += "<tr><td>" + data.empId + "</td><td>" + data.taskId + "</td><td>" + data.task + "</td><td>" + data.date + "</td></tr>"

            }
            let endTable = "</table><br><a href='deleteTask'>Delete Task</a><a href='addTask'>Add Task</a>";
            tableContent = startTable + tableContent + endTable;
            response.write(tableContent);
        } else if (urlInfo.pathname == "/deleteTask") {
            response.write(deleteTaskForm);
        } else if (urlInfo.pathname == "/deleteTaskRoute") {
            let deleteTaskObj = urlInfo.query;
            let index = 0;
            for (let i = 0; i < taskList.length; i++) {
                if (deleteTaskObj.taskId == taskList[i].taskId) {
                    taskList.splice(i, 1);
                    fs.writeFileSync("task.json", JSON.stringify(taskList));
                    response.write(addTask);
                    break;
                }
            }
        }
        else {
            //console.log(urlInfo.path);
            response.write(addTask);
        }

    }
    response.end();

});
server.listen(4000, () => console.log("Server running on port 9090"));