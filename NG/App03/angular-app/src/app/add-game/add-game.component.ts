import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  addForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    year: new FormControl(''),
    rate: new FormControl(''),
    minAge: new FormControl(''),
    minPlayers: new FormControl(''),
    maxPlayers: new FormControl('')
  });

  constructor(private gamesDataService: GamesDataService) { }

  ngOnInit(): void {
  }
  addGame(): void {
    console.log(this.addForm.value);
    this.gamesDataService.addGame(this.addForm.value)
      .then(() => console.log("Game saved"));
  }
}