/*
Ver el siguiente modulo para implementar un multiselect dropdown
https://github.com/CuppaLabs/angular2-multiselect-dropdown


Varios diseños 
https://github.com/mdbootstrap/Angular-Bootstrap-with-Material-Design
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { LoginService } from './services/login.service';
import { EventsService } from './services/events.service';
import { ClassroomsService } from './services/classrooms.service';


import { Classroom } from './classes/Classroom.class';
import { Event } from './classes/Evento.class';
import { Response } from '@angular/http/src/static_response';
import { error } from 'selenium-webdriver';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'events-component',
  templateUrl: './templates/events.template.html',
  styleUrls: ['./templates/css/sidemenu.css','./templates/css/perfil.css',  './templates/font-awesome/css/font-awesome.css']
})

export class EventsComponent implements OnInit {
    opcion: string = 'crear';
    events: Event[] = [];


    //Crear Evento
    message_to_show = ""
    classrooms: Classroom[] = [];
    title: string = '';
    description: string = '';
    place: string = ''
    date= {};
    plane: string = '';
    photo_event: string;
    photo_event_name : string;

    //Cambiar avatar
    optionsModel: number[];
    imgAvatar: FileList;
    

    //MultiSelect Dropdown variables
    itemList = []
    selectedItems = [];
    settings = {};

    // test
    private fileReader: FileReader;
    private base64Encoded: string;

    constructor(private ServicioLogin: LoginService,private ServicioClassroom: ClassroomsService ,private ServicioEventos :EventsService, private Ruta: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        //---- Necesario para multiselect dropdown
        this.selectedItems = [];
        this.settings = {
          text: "Seleecciona clases participantes",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          classes: "myclass custom-class"
      };
          if(!this.ServicioLogin.isLogged) {
            this.router.navigateByUrl('/');
          }else{
            // Conseguimos las clases
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
                  var c = {"id": id,"itemName": classroom.name, "category": classroom.level}
                  this.itemList.push(c)
                }
                console.log(this.itemList)
              },
              error => console.log(error)
              
            )
          }      
        }
    // MultiSelect Dropdown 
    onItemSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }
    eleccion(opción: string): void {
      this.opcion = opción;
    }
    //-----MultiSelect Dropdown ---
    crearEvento() {
      //var pieces = this.date.split('-')
      console.log(this.date)
      var date = this.date["day"]+'/'+this.date["month"]+'/'+this.date["year"]
      var classrooms = []
      for (let classroom of this.selectedItems){
        classrooms.push(classroom["itemName"])
      }
      console.log(this.place)
      console.log(date)
      console.log(classrooms)
      this.ServicioEventos.createEvent(this.title, this.description, this.place, date,classrooms, this.photo_event, this.photo_event_name).subscribe(
        response => {
          this.message_to_show = "Created correctly"
          // Limpiamos formulario
          this.selectedItems = []
          this.date = ""
          this.title = ""
          this.description = ""
          this.place = ""
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

    //--------Subida de imagen

    fileChange($event) {
      this.readThis($event.target);
    }
    readThis(inputValue: any): void {
      var file:File = inputValue.files[0];
      console.log(file.name)
      var myReader:FileReader = new FileReader();
    
      myReader.onloadend = (e) => {
        console.log(e)
        this.photo_event = myReader.result.split(';base64,')[1];
        this.photo_event_name = file.name
        console.log("Juuuuas")
        console.log(this.photo_event)
      }
      myReader.readAsDataURL(file);
    }
    //--------
}