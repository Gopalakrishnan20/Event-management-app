import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(form:any){
    var userName = form.userName;
    console.log(userName);
  
    var pass = form.pass;
    console.log(pass);
  }

}
