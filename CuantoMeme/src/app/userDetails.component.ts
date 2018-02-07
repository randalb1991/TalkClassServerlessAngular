import { Router, ActivatedRoute} from '@angular/router';
import { Vineta } from './classes/Vineta.class';
import { Component, Input, OnInit } from '@angular/core';
//import { VinetasService } from './services/vinetas.service';
//import { UsuarioService } from './services/usuarios.service';
//import { ComentariosService } from './services/comentario.service';
import { LoginService } from './services/login.service';
import { Event } from './classes/Evento.class';
//import { Comentario } from './classes/Comentario.class';
import { EventsService } from './services/events.service';
import { ClassroomsService } from './services/classrooms.service';
import { Classroom } from './classes/Classroom.class';


import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user-details',
  templateUrl: './templates/userDetails.template.html',
  styleUrls: ['./templates/css/eventdetails.css', './templates/css/sidemenu.css','./templates/font-awesome/css/font-awesome.css']
})

export class UserDetailsComponent implements OnInit {
  title:string;
  date:string;
  event: Event;
  classrooms: Classroom[] = [];

//MultiSelect Dropdown variables - Classrooms
      itemList = []
      selectedItems = [];
      settings = {};

  constructor (private ServicioLogin: LoginService,private ServicioClassroom: ClassroomsService ,private ServicioEventos :EventsService,private route: ActivatedRoute, private router: Router){}

  ngOnInit() {

    if(!this.ServicioLogin.isLogged) {
      this.router.navigateByUrl('/');
    }else{
      // Conseguimos las clases
      this.title = this.route.snapshot.params['title']
      this.date = this.route.snapshot.params['date']
      console.log(this.route.snapshot.params['title'])
      console.log(this.route.snapshot.params['date'])
      this.ServicioEventos.getevent(this.title, this.date).subscribe(
        response => {
          console.log(response)
          this.event = response[0]
          console.log('el evento que estas viendo es '+event)
        },
        error => console.log(error)
        
      )
      this.ServicioClassroom.getClassrooms().subscribe(
        response => {
          this.classrooms = response
          /* 
          Contruimos los diccionarios para introducirlo en el array para 
          mostrar las listas de clases. Necesario para multiselec dropdown
          */
          var id = 0;
          for (let classroom of this.classrooms){
            id++
            // Tener atributos id e itemName es obligatorio(tal cual)
            console.log("tete")
            console.log(this.event.classrooms.indexOf(classroom.name))
            if (this.event.classrooms.indexOf(classroom.name) < 0){
              console.log("classroom "+classroom.name+"is not invited")
              var c = {"id": id,"itemName": classroom.name, "category": classroom.level}
              this.itemList.push(c)
            }

          }

          
          console.log(this.itemList)
        },
        error => console.log(error)
        
      )

    } 

  }
  ModifyEvent(){
    
  }
  /*
  public vineta: Vineta;
  private followinguser = false;
  constructor(
  private login: LoginService,
  private route: ActivatedRoute,
  private router: Router,
  private servicioVinetas: VinetasService,
  private serviciocomentarios: ComentariosService,
  public ServicioLogin: LoginService,
  private ServicioUsuario: UsuarioService
  ) {
}

    isAdmin: boolean = false;

    //Consige el id de la viñeta a la que estamos accediendo
    ngOnInit() {

      if(this.ServicioLogin.isLogged) {
        this.isAdmin = this.ServicioLogin.user.isAdmin;
      }
      this.servicioVinetas.getVineta(this.route.snapshot.params['id']).subscribe(
        vineta=> {
          this.vineta = vineta;
          if(this.ServicioLogin.isLogged) {
            this.followinguser = this.ServicioLogin.user.isFollowed(this.vineta.autor.id);
            console.log("siguiendo al usuario: "+this.followinguser)
          }
          
      },
        error => console.log(error)
      );
    }
    followuser(id:number){
      if(this.login.isLogged === false) {
        this.router.navigateByUrl("/login");
      }else {
        this.ServicioUsuario.followUser(id).subscribe(
        seguidos=>{
              this.ServicioLogin.user.setFollowings([]);
              for (var i = 0; i < seguidos["length"]; i++) { 
                this.ServicioLogin.user.seguidos.push(seguidos[i]);
            }
            this.followinguser = this.ServicioLogin.user.isFollowed(this.vineta.autor.id);
            let link:any[] = ['/vineta', id];
            this.router.navigate(link)
    },
    error => console.error(error)
      )
    }
    }
    unfollowuser(id:number){
      if(this.login.isLogged === false) {
        this.router.navigateByUrl("/login");
      }else {
        this.ServicioUsuario.unfollowUser(id).subscribe(
        seguidos=>{
              
              this.ServicioLogin.user.setFollowings([]);
              if(typeof seguidos !== "undefined"){
                console.log("vamos a ver los seguidos")
                console.log(seguidos)
                for (var i = 0; i < seguidos["length"]; i++) { 
                  this.ServicioLogin.user.seguidos.push(seguidos[i]);
                }
              }else{
                console.log("no considero que haya nada")
              }
            this.followinguser = this.ServicioLogin.user.isFollowed(this.vineta.autor.id);
            let link:any[] = ['/vineta', id];
            this.router.navigate(link)
    },
    error => console.error(error)
      )
    }
    }
    like(id: number): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.likeVineta(id).subscribe(
        likes => {
        this.login.user.setLikes([]);
        for (var i = 0; i < likes["length"]; i++) { 
          this.login.user.likes.push(likes[i]);
        }
        console.log(this.login.user)
        this.vineta.likes = this.vineta.likes+1;
    },///console.log(likes),this.login.user.setLikes(likes.instanceof()),
        error => console.log(error)
      ); 
    }
  }

  dislike(id: number): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.dislikeVineta(id).subscribe(
        dislikes => {
        this.login.user.setDislikes([]);
        for (var i = 0; i < dislikes["length"]; i++) { 
          this.login.user.dislikes.push(dislikes[i]);
        }
        console.log(this.login.user)
        this.vineta.dislikes = this.vineta.dislikes+1;
        },
        error => console.log(error)
      );
    }
  }
  favorite(id: number): void {
    if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.servicioVinetas.favoriteVineta(id).subscribe(
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

  comentar(comentario: string):void {
    var id = this.vineta.id
     if(this.login.isLogged === false) {
      this.router.navigateByUrl("/login");
    } else {
      //llamar a la API
      this.serviciocomentarios.comentarVineta(this.vineta.id, comentario).subscribe(
        vineta => {
          this.vineta = <Vineta>vineta
          let link:any[] = ['/vineta', id];
          this.router.navigate(link)
    },
    error => console.log(error)
      );
    }
  }

  eliminarVineta(id: number): void {
    this.servicioVinetas.eliminarViñeta(id);
    this.router.navigateByUrl('/');
  }

  eliminarComentario(id: number, c: Comentario): void {
    let index: number = -1;
    //Llamar a la API
    this.serviciocomentarios.eliminarComentario(id);
    //Eliminar en local
    index = this.vineta.comentarios.indexOf(c);
    if(index > -1) {
      this.vineta.comentarios.splice(index, 1);
    }
  }
  */
}