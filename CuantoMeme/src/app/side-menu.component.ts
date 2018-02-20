import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Classroom } from './classes/Classroom.class';
import { Event } from './classes/Evento.class';


import { LoginService } from './services/login.service';
import { ClassroomsService } from './services/classrooms.service';
import { EventsService } from './services/events.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'side-menu',
  templateUrl: './templates/sidemenu.template.html',
  styleUrls: ['./templates/css/sidemenu.css', './templates/font-awesome/css/font-awesome.css']
})

export class sideMenuComponent{
    public classrooms = [];
    public classrooms_to_list = []
    public levels = []
    public searching = false
    constructor(public servicioLogin: LoginService, public servicioevent: EventsService,public servicioClassrooms:ClassroomsService, private router: Router) {
    }

    ngOnInit(){
      if(!this.servicioLogin.isLogged) {
        this.router.navigateByUrl('/');
      }else{
        this.servicioClassrooms.get_Classrooms().then(
          classrooms => {
            this.classrooms = classrooms
            this.levels = this.get_levels_from_classrooms()
            console.log(this.levels)
          })
          .catch(
            error =>{ console.log(error)}

          )
      }
    }

    get_levels_from_classrooms(){
      var levels: string[] = [];
      for (let classroom of this.classrooms) {
          if (levels.indexOf(classroom.level) == -1){
              levels.push(classroom.level)
          }
      }
      return levels
    }
    get_classrooms_by_level(level:string){
      var classrooms_to_list = []
      for (let classroom of this.classrooms) {
        if (classroom.level == level){
          classrooms_to_list.push(classroom)
        }
      this.classrooms_to_list = classrooms_to_list.sort()
      console.log(this.classrooms_to_list)
    }
    }
    logOut() {
      this.servicioLogin.logOut().subscribe(
        response => {
          console.log(response)}, 
          error => console.log(error));
    }
    issearching(){
      console.log('cambio searching')
      this.searching = !this.searching
    }
}