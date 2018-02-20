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
  listaEventos: Event[];
  constructor(private login: LoginService, private ServicioEventos :EventsService,private router: Router, private ServicioLogin: LoginService) {
    //etc
  }

  ngOnInit() {
    if(!this.ServicioLogin.isLogged) {
      this.router.navigateByUrl('/');
    }else{
      this.ServicioEventos.get_events().then(
        events =>{
          console.log(events)
          this.listaEventos = events
        })
        .catch(
        error => console.log(error)
      )
    }

  }
/*
  like(viñeta: Vineta): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.likeVineta(viñeta.id).subscribe(
        likes => {
        this.login.user.setLikes([]);
        for (var i = 0; i < likes["length"]; i++) { 
          this.login.user.likes.push(likes[i]);
        }
        console.log(this.login.user)
        viñeta.likes = viñeta.likes+1;
    },///console.log(likes),this.login.user.setLikes(likes.instanceof()),
        error => console.log(error)
      ); 
    }
  }

  dislike(viñeta: Vineta): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.dislikeVineta(viñeta.id).subscribe(
        dislikes => {
        this.login.user.setDislikes([]);
        for (var i = 0; i < dislikes["length"]; i++) { 
          this.login.user.dislikes.push(dislikes[i]);
        }
        console.log(this.login.user)
        viñeta.dislikes = viñeta.dislikes+1;
        },
        error => console.log(error)
      );
    }
  }
  favorite(viñeta: Vineta): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.favoriteVineta(viñeta.id).subscribe(
        favorites => {
        this.login.user.setFav([]);
        for (var i = 0; i < favorites["length"]; i++) { 
          this.login.user.favoritos.push(favorites[i]);
        }
        console.log(this.login.user)
        },
        error => console.log(error)
      );
    }
  }
  
  eliminarVineta(id: number, viñeta: Vineta) {
    this.servicioVinetas.eliminarViñeta(id);
    let index: number = this.listaVinetas.indexOf(viñeta);
    this.listaVinetas.splice(index, 1);
  }
  */
}