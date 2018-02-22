import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Multimedia } from './classes/Multimedia.class';
import { Event } from './classes/Evento.class';
import { MultimediaService } from './services/multimedia.service';

@Component({
  selector: 'multimedia-lists',
  templateUrl: './templates/multimedia-list.template.html',
  styleUrls: ['./templates/css/eventdetails.css', './templates/css/sidemenu.css', './templates/font-awesome/css/font-awesome.css']
})

export class MultimediaListComponent implements OnInit{
  @Input() listamultimedia: Multimedia[];
  original_file:string;//'https://cdn.pixabay.com/photo/2016/11/16/00/19/golden-retriever-1827899_960_720.jpg'
  constructor(private login: LoginService, private router: Router, private ServicioMultimedia: MultimediaService) {
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
  generate_original_url(multimedia:Multimedia){
      this.original_file = this.ServicioMultimedia.generate_multimedia_original_url(multimedia.picture_key,this.login.user_logged.get_access_key(),this.login.user_logged.get_secret_key(),
      this.login.user_logged.get_session_token())
      /*
      console.log('a descargar')
      console.log(multimedia)
      this.ServicioMultimedia.download_imagen(multimedia.picture_key,this.login.user_logged.get_access_key(),this.login.user_logged.get_secret_key(),
      this.login.user_logged.get_session_token())
      */
  }
}