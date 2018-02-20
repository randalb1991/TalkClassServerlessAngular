import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './IndexComponent.component';
import { LoginComponent } from './login.component';


import { EventsComponent } from './eventsComponent.component';
import { EventDetailsComponent}from './eventDetails.component';
import { UsersComponent } from './usersComponent.component';
import { UserDetailsComponent}from './userDetails.component';
import { ClassroomsComponent } from './classroomsComponent.component';
import { SearchResultComponent } from './search-result.component';

const rutas: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent }, 
    { path: 'login', component: LoginComponent },
    //----------------Talkclass
    { path: 'events', component: EventsComponent },
    { path: 'event/:title/:date', component: EventDetailsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'classrooms', component: ClassroomsComponent },
    { path: 'users/:username', component: UserDetailsComponent },
    { path: 'search', component: SearchResultComponent}
    //{ path: 'users', component: UsersComponent },
    //{ path: 'classrooms', component: ClassroomsComponent },
    //{ path: 'home', component: HomeComponent }
]

export const routing = RouterModule.forRoot(rutas);