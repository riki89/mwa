import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { MembersDataService } from './members-data.service';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberPageComponent,
    AddMemberComponent,
    NavigationComponent,
    WelcomePageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: MemberListComponent,
      }, 
      {
        path: "members",
        component: MemberListComponent
      },
      {
        path: "member/:memberId",
        component: MemberPageComponent
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
  providers: [MembersDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
