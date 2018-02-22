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
  message_to_show_upload_picture: string = ''
  message_to_show_invite_classroom: string = ''
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
          this.ServicioEventos.get_event(this.title, this.date).then(
              response => {
                  console.log(response)
                  this.event = response[0]
                  console.log('el evento que estas viendo es ' + event)
                  this.ServicioClassroom.get_Classrooms().then(
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
                              console.log(this.itemList)
                          }

                        }
                      ).catch(
                          error => console.log(error)
                      )
                  this.ServicioMultimedia.get_multimedia_for_event(this.event.title, this.event.date).then(
                      response => {
                          this.multimedias = response
                          console.log(this.multimedias)
                      }
                  )
                  .catch(
                      error => console.log(error)
                  )
                  })
              .catch(
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
      this.ServicioEventos.modify_event(newclassrooms, this.event)
        .then(
            result => {
                if (result.status == 200){
                  this.message_to_show_invite_classroom = "Created correctly"
                  // Limpiamos formulario
                  this.selectedItems = []
                  console.log(result)
                }else{
                    console.log('Error creating the classroom')
                    this.message_to_show_invite_classroom = result.response.data
                }
            }
        )
  }

  upload_picture() {
      var title_picture = this.input_title_picture_to_upload + '_' + this.ServicioLogin.user_logged.username + '.' + this.extension
      console.log('title to upload ' + title_picture)
      var date = this.date["day"] + '-' + this.date["month"] + '-' + this.date["year"]
      this.ServicioMultimedia.post_multimedia(this.ServicioLogin.user_logged.get_session_token(), this.event.title, this.event.date, title_picture, this.picture_to_upload)
          .then(
            result => {
                if (result.status == 200){
                  this.message_to_show_upload_picture = "Picture Uploaded correctly"
                  // Limpiamos formulario
                  this.selectedItems = []
                  this.date = ""
                  this.input_title_picture_to_upload = ""
                  this.extension = ''
                  this.picture_to_upload_name = ''
                  this.picture_to_upload = ""
                  console.log(result)
                  this.ServicioMultimedia.get_multimedia_for_event(this.event.title, this.event.date)
                  .then(
                    response => {
                        this.multimedias = response
                        console.log(this.multimedias)
                    }
                  )
                  .catch(
                      error => console.log(error)
                  )
                }else{
                    console.log('Error uploading picture')
                    this.message_to_show_upload_picture = result.response.data
                }
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
}