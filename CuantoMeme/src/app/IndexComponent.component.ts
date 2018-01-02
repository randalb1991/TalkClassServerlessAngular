import { Component } from '@angular/core';
import { Vineta } from './classes/Vineta.class';
import { listaVinetasComponent } from './listaVinetas.component';
import { VinetasService } from './services/vinetas.service';
import { UsuarioService } from './services/usuarios.service';
import { LoginService } from './services/login.service';
import { loggedUserService } from './services/logged-user.service';
import { Usuario } from './classes/Usuario.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'index-component',
  templateUrl: './templates/indexComponent.template.html',
  styleUrls: ['./templates/css/index.css', './templates/font-awesome/css/font-awesome.css']
})

export class IndexComponent {
  title = '¡Welcome to TalkClass!';
  classrooms = [];
  currentPage = 0;
  loggedUser: Usuario;

  constructor(private servicioVinetas: VinetasService, private serviciologin: LoginService, private Ruta: ActivatedRoute, private router: Router) {
    //etc
  }

  ngOnInit() {
    if (this.serviciologin.isLogged){
        console.log("usuario logeado")
    }else{
        console.log("usuario no loggeador...redirigiendo a login")
        this.router.navigateByUrl('/login');
    }

  }

  /*
  masVinetas(): void {
    this.currentPage = this.currentPage + 1;
    this.servicioVinetas.getVinetas(this.currentPage).subscribe(
      vinetas => {
        for(let viñeta of vinetas) {
          this.listaVinetas.push(viñeta);
        }
      },
      error => console.error(error)
    );
  }*/

}