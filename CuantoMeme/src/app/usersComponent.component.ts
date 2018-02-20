/*
Ver el siguiente modulo para implementar un multiselect dropdown
https://github.com/CuppaLabs/angular2-multiselect-dropdown


Varios diseños 
https://github.com/mdbootstrap/Angular-Bootstrap-with-Material-Design
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { LoginService } from './services/login.service';
import { UsersService } from './services/users.service';
import { ClassroomsService } from './services/classrooms.service';

import {User} from './classes/User.class';
import { Classroom } from './classes/Classroom.class';
import { Response } from '@angular/http/src/static_response';
import { error } from 'selenium-webdriver';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'users-component',
  templateUrl: './templates/users.template.html',
  styleUrls: ['./templates/css/listausuarios.css', './templates/font-awesome/css/font-awesome.css']
})

export class UsersComponent implements OnInit {
    opcion: string = 'crear';
    users: User[] = [];


    //Crear Evento
    error_message_password = "Las contraseñas no coinciden"
    message_to_show = ""
    classrooms: Classroom[];
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    email: string = ''
    phone: number;
    password: string = ''
    confirmpassword: string = ''
    address: string = ''
    postalcode: number;
    birthday= {};
    photo_profile: string;
    photo_profile_name : string;

    //Cambiar avatar
    optionsModel: number[];
    imgAvatar: FileList;
    

    //MultiSelect Dropdown variables
    parentitemList = []
    teacheritemList = []
    selectedItems = [];
    settings = {};

    //MultiSelect Dropdown variables - Users
    rolesList = []
    selectedRole = [];
    roleSettings = {};

    // test
    private fileReader: FileReader;
    private base64Encoded: string;

    constructor(private ServicioLogin: LoginService,private ServicioClassroom: ClassroomsService ,private ServicioUsers :UsersService, private Ruta: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        //---- Necesario para multiselect dropdown role
        this.rolesList = [      
          {"id":1,"itemName":"Teacher"},
          {"id":2,"itemName":"Parent"}]
        this.roleSettings = {singleSelection: true, text:"Select your role"};
        console.log('role list')
        console.log(this.rolesList)
        //---- Necesario para multiselect dropdown classrooms
        this.selectedItems = [];
        this.settings = {
          singleSelection: true,
          text: "Seleecciona la clase",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          classes: "myclass custom-class"
      };
          if(!this.ServicioLogin.isLogged) {
            this.router.navigateByUrl('/');
          }else{
            // Conseguimos las clases
            this.ServicioClassroom.get_Classrooms().then(
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
                  this.parentitemList.push(c)
                  if (classroom['tutor'].length == 0){
                    this.teacheritemList.push(c)
                  }
                }
              }             
            )
            .catch(
              error => console.log(error)
            )
            this.ServicioUsers.get_users().then(
              response => {
                this.users = response
              },
              
            )
            .catch(
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
    createUser() {
      //var pieces = this.date.split('-')
      console.log(this.birthday)
      var birthday = this.birthday["day"] + '-' + this.birthday["month"] + '-' + this.birthday["year"]
      var classroom = this.selectedItems[0]['itemName']
      var role = this.selectedRole[0]['itemName'].toLowerCase()
      this.ServicioUsers.create_user(this.username, this.firstname, role, this.lastname, this.password,
              birthday, this.email, this.address, this.postalcode, this.phone, classroom, this.photo_profile, this.photo_profile_name)
          .then(
            result => {
                if (result.status == 200){
                    this.message_to_show = "User created correctly"
                    // Limpiamos formulario
                    this.selectedItems = []
                    this.selectedRole = []
                    this.username = ""
                    this.firstname = ""
                    this.lastname = ""
                    this.email = ""
                    this.address = ""
                    this.birthday = {}
                    this.postalcode = null
                    this.phone = null
                    this.password = ""
                    this.confirmpassword = ""
                    this.photo_profile = ""
                    this.photo_profile_name = ""
                    console.log(result)
                }else{
                    console.log('Error creating the User')
                    this.message_to_show = result.response.data
                }
            }
        )

  }

  //--------Subida de imagen

  fileChange($event) {
      this.readThis($event.target);
  }
  readThis(inputValue: any): void {
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
          this.photo_profile = myReader.result.split(';base64,')[1];
          this.photo_profile_name = file.name
      }
      myReader.readAsDataURL(file);
    }
    //--------
}