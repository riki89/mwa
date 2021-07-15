import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Member } from './member-list/member-list.component';
import { Credentials } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MembersDataService {

  private apiBaseUrl:string ="http://localhost:3200/api";
  constructor(private http: HttpClient) { }

  public getMembers(): Promise<Member[]>{
    const url:string= this.apiBaseUrl+"/members";
    return this.http.get(url).toPromise()
      .then(response => response as Member[])
      .catch(this.handleError);
  };

  public getMember(memberId:string): Promise<Member>{
    const url:string= this.apiBaseUrl+"/members/"+memberId;
    return this.http.get(url).toPromise()
      .then(response => response as Member)
      .catch(this.handleError);
  };

  public deleteMember(memberId: string): Promise<Member> {
    const url:string= this.apiBaseUrl+"/members/"+memberId;
    return this.http.delete(url).toPromise()
      .then(response => response as Member)
      .catch(this.handleError);
  }

  public addMember(member: JSON): Promise<Member> {
    const url:string= this.apiBaseUrl+"/members";
    return this.http.post(url, member).toPromise()
      .then(response => response as Member)
      .catch(this.handleError);
  }


  public handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }

  ////Users
  public login(credentials:Credentials):Promise<unknown>{
    ///1-Build URL
    const url:string = this.apiBaseUrl+"/users/login";
    //2 - tell http to make a request
    //3 - convert observable to a promise
    return this.http.post(url, credentials).toPromise().then(this.loginDone).catch(this.handleLoginError);
  }

  private loginDone(response:unknown):unknown{
    console.log("Login done");
    return response;
  }
  private handleLoginError(err:unknown):unknown{
    console.log("Login error");
    return {};
    
  }
}
