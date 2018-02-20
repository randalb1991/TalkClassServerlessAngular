import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './classes/user.class';

@Component({
  selector: 'user-lists',
  templateUrl: './templates/user-list.template.html',
  styleUrls: ['./templates/css/listausuarios.css', './templates/font-awesome/css/font-awesome.css']
})

export class UserListComponent implements OnInit{
  @Input() userlist: User[];
  constructor(private login: LoginService, private router: Router) {
    //etc
  }
  ngOnInit(){
    if(!this.login.isLogged){
      this.router.navigateByUrl("/login");
    } 
  }
  //El componente recibe una lista de multimedia y las muestra

}