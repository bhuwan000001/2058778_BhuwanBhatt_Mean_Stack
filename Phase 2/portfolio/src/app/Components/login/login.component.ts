import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginRef = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()
  });
  
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
   loginDetail = [
    {user:"Raj",pass:"123",email:"bhuwan@tcs.com"},
    {user:"Ramesh",pass:"567",email:"bhatt@tcs.com"},
    {user:"Raju",pass:"1100",email:"bhatt.bhuwan@tcs.com"},
]
  msg:string="";
  checkUser(){
    let login = this.loginRef.value;
    let userEmail = ""
    if(this.loginDetail.map(user=>{user.user == login.user && user.pass == login.pass})){
      //const index = this.loginDetail.find(element=>element.user== login.user)  
      this.router.navigate(['portfolio',login.user]);  // appended name through path
    } else {
        this.msg  = "InValid username or password";
    }
    this.loginRef.reset();   
  }
  btnClick() {
    this.loginDetail.push(this.loginRef.value)
    this.router.navigateByUrl('/register');
};
}
