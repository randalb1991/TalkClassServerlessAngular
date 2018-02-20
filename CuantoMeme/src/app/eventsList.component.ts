import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';import { Router, ActivatedRoute} from '@angular/router';
import { EventsService } from './services/events.service';

import { Classroom } from './classes/Classroom.class';
import { Event } from './classes/Evento.class';
@Component({
  selector: 'lista-eventos',
  templateUrl: './templates/eventsList.template.html',
  styleUrls: ['./templates/css/listaEventos.css', './templates/font-awesome/css/font-awesome.css']
})

export class EventsListComponent implements OnInit {
  
  //El componente recibe una lista de viñetas y las muestra

  @Input() listaEventos: Event[];
  constructor(private login: LoginService, private ServicioEventos :EventsService,private router: Router, private ServicioLogin: LoginService) {
    //etc
  }

  ngOnInit() {
    if(!this.ServicioLogin.isLogged) {
      this.router.navigateByUrl('/');
    }
  }
}