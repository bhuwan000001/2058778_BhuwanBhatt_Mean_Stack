import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  msg?:string=""
  constructor() { }

  ngOnInit(): void {
  }
  storeList(storeList:NgForm){
    let taskDetails = storeList.value;
    var list = JSON.parse(localStorage.getItem('items') || "[]");
    var item = {
      name:taskDetails.name,
      empID:taskDetails.empID,
      TaskName:taskDetails.TaskName,
      deadline:taskDetails.deadline

    }
    list.push(item);
    localStorage.setItem("taskDetails", JSON.stringify(list));
  }

}
