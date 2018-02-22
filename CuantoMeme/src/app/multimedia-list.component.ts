import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Multimedia } from './classes/Multimedia.class';
import { Event } from './classes/Evento.class';

@Component({
  selector: 'multimedia-lists',
  templateUrl: './templates/multimedia-list.template.html',
  styleUrls: ['./templates/css/eventdetails.css', './templates/css/sidemenu.css', './templates/font-awesome/css/font-awesome.css']
})

export class MultimediaListComponent implements OnInit{
  @Input() listamultimedia: Multimedia[];
  constructor(private login: LoginService, private router: Router) {
    //etc
  }
  ngOnInit(){
    if(!this.login.isLogged){
      this.router.navigateByUrl("/login");
    } 
  }
  //El componente recibe una lista de multimedia y las muestra
  search_by_tag(tag:string){
    console.log('Buscando archivos  1 con el tag: '+tag)
    this.router.navigate(['/search'], { queryParams: { type: 'Tag', 'value': tag} });
  }
}