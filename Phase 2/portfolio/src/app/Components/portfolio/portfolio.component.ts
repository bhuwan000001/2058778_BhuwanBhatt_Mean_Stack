import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  user:string=""
  email:string=""
  //DI  for ActivatedRoute 
  
  constructor(public activeRoute:ActivatedRoute,public router:Router) { 
    this.activeRoute.params.subscribe(
      data=>this.user=data.uname,
      data=>this.email=data.uemail,
      );
  } 

  ngOnInit(): void {
  }

}
