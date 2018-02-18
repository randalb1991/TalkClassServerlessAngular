import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  Event
} from './classes/Evento.class';
import {
  Multimedia
} from './classes/Multimedia.class';
import {
  Classroom
} from './classes/Classroom.class';
import {
  LoginService
} from './services/login.service';
import {
  EventsService
} from './services/events.service';
import {
  ClassroomsService
} from './services/classrooms.service';
import {
  MultimediaService
} from './services/multimedia.service';



import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'event-detaitls',
  templateUrl: './templates/eventDetails.template.html',
  styleUrls: ['./templates/css/eventdetails.css', './templates/css/sidemenu.css', './templates/font-awesome/css/font-awesome.css']
})

export class EventDetailsComponent implements OnInit {
  message_to_show: string = ''
  input_title_picture_to_upload: string;
  extension:string
  title: string;
  date: string;
  event: Event;
  classrooms: Classroom[] = [];
  multimedias: Multimedia[] = []
  picture_to_upload: string;
  picture_to_upload_name: string;

  //MultiSelect Dropdown variables
  itemList = []
  selectedItems = [];
  settings = {};

  // Toogle Add picture
  public isCollapsed = true;

  constructor(private ServicioLogin: LoginService, private ServicioMultimedia: MultimediaService, private ServicioClassroom: ClassroomsService, private ServicioEventos: EventsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

      if (!this.ServicioLogin.isLogged) {
          this.router.navigateByUrl('/');
      } else {
          // Conseguimos las clases
          this.title = this.route.snapshot.params['title']
          this.date = this.route.snapshot.params['date']
          console.log(this.route.snapshot.params['title'])
          console.log(this.route.snapshot.params['date'])
          this.ServicioEventos.get_event(this.title, this.date).subscribe(
              response => {
                  console.log(response)
                  this.event = response[0]
                  console.log('el evento que estas viendo es ' + event)
                  this.ServicioClassroom.get_Classrooms().subscribe(
                      response => {
                          this.classrooms = response
                          /* 
                          Contruimos los diccionarios para introducirlo en el array para 
                          mostrar las listas de clases. Necesario para multiselec dropdown
                          */
                          var id = 0;
                          for (let classroom of this.classrooms) {
                              id++
                              // Tener atributos id e itemName es obligatorio(tal cual)
                              console.log('Cheking classrooms not invited')
                              if (this.event.classrooms.indexOf(classroom.name) < 0) {
                                  console.log("classroom " + classroom.name + "is not invited")
                                  var c = {
                                      "id": id,
                                      "itemName": classroom.name,
                                      "category": classroom.level
                                  }
                                  this.itemList.push(c)
                              }

                          }
                          console.log(this.itemList)
                      },
                      error => console.log(error)
                  )

              },
              error => console.log(error)
          )
          this.ServicioMultimedia.get_multimedias().subscribe(
              response => {
                  this.multimedias = response
                  console.log(this.multimedias)
              },
              error => console.log(error)
          )
      }

  }
  modify_event() {
      var newclassrooms = []
      console.log("selecteditems")
      console.log(this.selectedItems)
      for (let item of this.selectedItems) {
          newclassrooms.push(item['itemName'])
      }
      console.log('new classrooms')
      console.log(newclassrooms)
      this.ServicioEventos.modify_event(newclassrooms, this.event).subscribe(
          response => {
              this.message_to_show = "Created correctly"
              // Limpiamos formulario
              this.selectedItems = []
              console.log(response)
          },
          error => {
              console.log(error)
              var status_code = error.status
              var message = error._body
              this.message_to_show = message
          }
      )
  }

  upload_picture() {
    var title_picture = this.input_title_picture_to_upload+'_'+this.ServicioLogin.user_logged.username+'.'+this.extension
    console.log('title to upload '+title_picture)
    var date = this.date["day"]+'-'+this.date["month"]+'-'+this.date["year"]
    this.ServicioMultimedia.post_multimedia(this.ServicioLogin.user_logged.get_session_token(), this.event.title, this.event.date, title_picture,this.picture_to_upload).subscribe(
      response => {
        this.message_to_show = "Created correctly"
        // Limpiamos formulario
        this.selectedItems = []
        this.date = ""
        this.input_title_picture_to_upload = ""
        this.extension = ''
        this.picture_to_upload_name= ''
        this.picture_to_upload = ""
        console.log(response)
      },
      error=>{
        console.log(error)
        var status_code = error.status
        var message = error._body
        this.message_to_show = message
      }
    )
  }
  fileChange($event) {
      this.readThis($event.target);
  }
  readThis(inputValue: any): void {
      var file: File = inputValue.files[0];
      console.log(file.name)
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
          console.log(e)
          this.picture_to_upload = myReader.result.split(';base64,')[1];
          this.extension = file.name.split('.')[1]
          console.log("Extension found: "+this.extension)
          console.log(this.picture_to_upload)
      }
      myReader.readAsDataURL(file);
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