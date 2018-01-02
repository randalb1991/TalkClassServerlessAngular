import { Component, Output, EventEmitter } from '@angular/core';
import { Usuario } from './classes/Usuario.class';
import { LoginService } from './services/login.service';
import { loggedUserService } from './services/logged-user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'login-component',
  templateUrl: './templates/login.template.html',
  //styleUrls: ['./templates/css/app.component.css']
})
export class LoginComponent {

  constructor(private ServicioLogin: LoginService, private redireccion: Router) {}

  username: string;
  pass: string;
  role: string;
  error = false;
  error_message: string = "";

  //@Output() loggedUser = new EventEmitter<Usuario>();
  //Comentario

  login() {
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