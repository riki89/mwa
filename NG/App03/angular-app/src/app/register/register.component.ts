import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms" 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // message:string = "Please make sure the passwords match";
  // err:string = "Please make sure you fill all the fields";
  message!:string;
  err!:string;
  
  addForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
    name: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  public register(){

  }
}