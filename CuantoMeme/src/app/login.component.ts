import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from './services/login.service';
import { loggedUserService } from './services/logged-user.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

var config = require('./configuration-app/config-app')

//import apiGateway  from 'scripts/lib/apiGatewayCore/apiGatewayClient.js'
//import apigClientFactory  from 'scripts/apigClient.js'

//import {apigClientFactory} from './scripts/apigClient.js'
//import {apigClientFactory} from './scripts/apigClient.js'
// https://github.com/angular/angular/issues/21080
// https://github.com/angular/angular/issues/21971))

/**
 * https://github.com/pfernandom/aws-api-client
 * https://github.com/pfernandom/aws-api-client
 * npm install aws-api-gateway-client

 */
@Component({
  selector: 'login-component',
  templateUrl: './templates/login.template.html',
  //styleUrls: ['./templates/css/app.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private ServicioLogin: LoginService, private redireccion: Router) {

  }
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
    var params = {}
    var additionalParams = {}
    var body = {
                  "username": "profesor",
                  "password": "profesor",
                  "role": "teacher"
                }
    //var apigClientFactory = require('aws-api-gateway-client').default;
    //var config = {}
    //var apigClient = apigClientFactory.newClient(config);
    //apigClientFactory.newClient()
    /*
    var apigClient = apigClientFactory.newClient()
    apigClient.talkclassAuthenticationPost(params,body,additionalParams).then(
      function(result){
        console.log('jjjjjjjjjiiioo')
        console.log(result)
      }).catch(function(result){
        console.log('jooope')
        console.log(result)
      })
      */
    //var apigClient = aws.apigClientFactory.newClient()
    console.log()
    this.itemList = [
      {"id":1,"itemName":config.roles.teacher},
      {"id":2,"itemName":config.roles.parent},
                   
    ];
    this.selectedItems = [
          {"id":1,"itemName":"Teacher"}];
    this.settings = {singleSelection: true, text:"Select your role"};
    }
  
  login() {
    console.log(this.selectedItems)
    this.role = this.selectedItems[0]["itemName"].toLowerCase();
    console.log(this.role)
    this.ServicioLogin.login_talkclass(this.username, this.pass, this.role).subscribe(
      user =>  {
        this.ServicioLogin.setLoggedUser(user);
        console.log(this.ServicioLogin.user_logged);
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