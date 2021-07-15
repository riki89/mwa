import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesDataService } from './games-data.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { OrderPipe } from './order.pipe';
import { AddGameComponent } from './add-game/add-game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GamePageComponent,
    OrderPipe,
    AddGameComponent,
    NavigationComponent,
    WelcomePageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: GameListComponent,
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
        path: "test",
        component: WelcomePageComponent
      },
      {
        path: "register",
        component: RegisterComponent
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
