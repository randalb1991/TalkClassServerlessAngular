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
import { IndexComponent } from './IndexComponent.component';
import { BusquedaComponent } from './busquedaComponent.component';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './signup.component';
import { listaVinetasComponent } from './listaVinetas.component';

import { EventsListComponent } from './eventsList.component';

import { NgbdModalBasicComponent } from './modal-ng/modal-basic.component';

import { vinetasDetalleComponent } from './vinetasDetalle.component';
import { VinetasService } from './services/vinetas.service';
import { UsuarioService } from './services/usuarios.service';
import { TagViewComponent } from './TagViewComponent.component';
import { routing }  from './appRouting.module';
import { TagService } from './services/tag.service';
import { sideMenuComponent } from './side-menu.component';
import { LoginService } from './services/login.service';
import { ComentariosService } from './services/comentario.service';

import { PerfilComponent } from './perfilComponent.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { loggedUserService } from './services/logged-user.service';
import { LikesComponent } from './likesComponent.component';
import { DislikesComponent } from './dislikesComponent.component';
import { FavoritesComponent } from './favoritesComponent.component';
import { HomeComponent } from './homeComponent.component';

import { EventsComponent } from './eventsComponent.component';
import { EventDetailsComponent}from './eventDetails.component';
import { EventsService } from './services/events.service';

import { UsersComponent } from './usersComponent.component';
import { UserDetailsComponent}from './userDetails.component';
import { UsersService } from './services/users.service';

import { ClassroomsService } from './services/classrooms.service';
import { ClassroomsComponent } from './classroomsComponent.component';

import { MultimediaService } from './services/multimedia.service';

@NgModule({
  declarations: [
    EventsListComponent,
    AppComponent,
    IndexComponent,
    BusquedaComponent,
    LoginComponent,
    SignUpComponent,
    listaVinetasComponent,
    vinetasDetalleComponent,
    TagViewComponent,
    sideMenuComponent,
    PerfilComponent,
    LikesComponent,
    FavoritesComponent,
    DislikesComponent,
    HomeComponent,
    EventDetailsComponent,
    EventsComponent,
    NgbdModalBasicComponent,
    UsersComponent,
    UserDetailsComponent,
    ClassroomsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [VinetasService,MultimediaService, EventsService,ClassroomsService,UsuarioService, TagService, LoginService, loggedUserService, ComentariosService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
