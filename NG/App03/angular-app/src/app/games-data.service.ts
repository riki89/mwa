import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Game } from './game-list/game-list.component';
import { Credentials } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl:string ="http://localhost:3100/api";
  constructor(private http: HttpClient) { }

  public getGames(): Promise<Game[]>{
    const url:string= this.apiBaseUrl+"/games";
    return this.http.get(url).toPromise()
      .then(response => response as Game[])
      .catch(this.handleError);
  };

  public getGame(gameId:string): Promise<Game>{
    const url:string= this.apiBaseUrl+"/games/"+gameId;
    return this.http.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);
  };

  public deleteGame(gameId: string): Promise<Game> {
    const url:string= this.apiBaseUrl+"/games/"+gameId;
    return this.http.delete(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);
  }

  public addGame(game: JSON): Promise<Game> {
    const url:string= this.apiBaseUrl+"/games";
    return this.http.post(url, game).toPromise()
      .then(response => response as Game)
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
