import { Inject, Injectable } from '@angular/core';

import {BROWSER_STORAGE} from "./storage";
import { MembersDataService } from "./members-data.service";

export class Credentials {
  username!: string;
  password!:string;
  name!:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private MembersDataService:MembersDataService, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  public saveToken(token: string){
    this.storage.setItem("games-token", token);
  }

  public getToken():string{
    return this.storage.getItem("games-token") as string;
  }

  public logout(){
    this.storage.removeItem("games-token");
  }

  public isLogedIn():boolean{
    const token = this.getToken();
    if (token){
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp > (Date.now()/ 1000)){
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
      return false;
    }
  }

  public getCurrentName():string{
    if (this.isLogedIn()){
      const token = this.getToken();
      const {name} = JSON.parse(atob(token.split(".")[2]));
      return name;
    } else {
      return "";
    }
  }

  public login(credentials:Credentials):Promise<any>{
      return this.MembersDataService.login(credentials);
  }
}
