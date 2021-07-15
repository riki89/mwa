import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

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
