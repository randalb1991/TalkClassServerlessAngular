import { Component, Output, EventEmitter } from '@angular/core';
import { Usuario } from './classes/Usuario.class';
import { LoginService } from './services/login.service';
import { loggedUserService } from './services/logged-user.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
//import {apigClientFactory} from './scripts/apigClient.js'
//import {apigClientFactory} from './scripts/apigClient.js'

@Component({
  selector: 'login-component',
  templateUrl: './templates/login.template.html',
  //styleUrls: ['./templates/css/app.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private ServicioLogin: LoginService, private redireccion: Router) {}
  itemList = [];
  selectedItems = [];
  settings = {};
  username: string;
  pass: string;
  role: string;
  error = false;
  error_message: string = "";

  //@Output() loggedUser = new EventEmitter<Usuario>();
  //Comentario
  ngOnInit(){
    //var apigClient = aws.apigClientFactory.newClient()
    console.log()
    this.itemList = [
      {"id":1,"itemName":"Teacher"},
      {"id":2,"itemName":"Parent"},
                   
    ];
    this.selectedItems = [
          {"id":1,"itemName":"Teacher"}];
    this.settings = {singleSelection: true, text:"Select Country"};
    }
  
  login() {
    console.log(this.selectedItems)
    this.role = this.selectedItems[0]["itemName"].toLowerCase();
    console.log(this.role)
    this.ServicioLogin.login_talkclass(this.username, this.pass, this.role).subscribe(
      user =>  {
        this.ServicioLogin.setLoggedUser(user);
        console.log(this.ServicioLogin.user);
        this.redireccion.navigateByUrl("/events");
      },
      error => {                
              var status_code = error.status
              var message = error._body      
              this.error_message = message
              this.error = true
              }

    );
  }

}