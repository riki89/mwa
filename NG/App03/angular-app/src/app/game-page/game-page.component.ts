import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from "../game-list/game-list.component";
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game: Game = {} as Game;

  constructor(private gamesDataService: GamesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId; 
    this.getGame(gameId);
  }

  

  private getGame(gameId: string): void{
    this.gamesDataService.getGame(gameId)
      .then((response) => this.receivedGame(response) )
      .catch(this.handleError);
  }

  private receivedGame(game:Game){
    this.game = game;

  };
  
  private handleError(error:any){
    console.log("Error ", error);
  };

}
