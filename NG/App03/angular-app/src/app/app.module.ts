import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesDataService } from './games-data.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { OrderPipe } from './order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GamePageComponent,
    OrderPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomePageComponent,
      }, 
      {
        path: "games",
        component: GameListComponent
      },
      {
        path: "game/:gameId",
        component: GamePageComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [GamesDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
