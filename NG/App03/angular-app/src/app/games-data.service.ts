import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Game } from './game-list/game-list.component';

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


  public handleError(err: any): Promise<any>{
    console.log("Something went wrong ", err);
    return Promise.reject(err.message || err);
    
  }
}
