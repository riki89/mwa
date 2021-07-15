import { Component, OnInit } from '@angular/core';

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  title:string = "MEAN Games";
  number:number = 5;
  login:boolean = false;
  loggedUser="";

  location: Location;
  constructor(location: Location) { this.location = location; }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return false;
  }

  public logout(){
    return false;
  }

  public isActive(url:string):string{
    const currentPath = this.location.path().split("/")[1];
        console.log(currentPath);
        return (url === currentPath ? 'active':'');
  }
}
