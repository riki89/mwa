import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})


export class GameListComponent implements OnInit {

  title: string = "MEAN games";
  // games = [this.game1, this.game2];
  games: Game[] = [];
  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {
    this.getGames();
    console.log(this.games);
    
  }

  public getGames(): void {
    this.gamesDataService.getGames()
      .then(foundGames => this.games = foundGames);
  } 

}
export class Game {
  _id!: string;
  title!: string;
  price!: number;
  year!: number;
  minPlayers!: number;
  maxiPlayers!: number;
  minAge!: number;
}