// https://github.com/pfernandom/aws-api-client
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
//---------
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
//------

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { IndexComponent } from './IndexComponent.component';

import { EventsListComponent } from './eventsList.component';

import { NgbdModalBasicComponent } from './modal-ng/modal-basic.component';

import { routing }  from './appRouting.module';
import { sideMenuComponent } from './side-menu.component';
import { LoginService } from './services/login.service';

import { TabsetComponent } from 'ngx-bootstrap';
import { loggedUserService } from './services/logged-user.service';

import { EventsComponent } from './eventsComponent.component';
import { EventDetailsComponent}from './eventDetails.component';
import { EventsService } from './services/events.service';

import { UsersComponent } from './usersComponent.component';
import { UserDetailsComponent}from './userDetails.component';
import { UsersService } from './services/users.service';

import { ClassroomsService } from './services/classrooms.service';
import { ClassroomsComponent } from './classroomsComponent.component';
import { MultimediaListComponent } from './multimedia-list.component';
import { UserListComponent } from './user-list.component';
import { SearchResultComponent } from './search-result.component';

import { MultimediaService} from './services/multimedia.service';


@NgModule({
  declarations: [
    EventsListComponent,
    AppComponent,
    LoginComponent,
    sideMenuComponent,
    EventDetailsComponent,
    EventsComponent,
    NgbdModalBasicComponent,
    UsersComponent,
    UserDetailsComponent,
    ClassroomsComponent,
    IndexComponent,
    MultimediaListComponent,
    UserListComponent,
    SearchResultComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [MultimediaService, EventsService,ClassroomsService, LoginService, loggedUserService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
