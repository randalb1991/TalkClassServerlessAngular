import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../classes/User.class';

@Injectable()
export class loggedUserService {
    
    UsuarioLogeado: User;

    constructor() {
        this.UsuarioLogeado = null;
    }

    setUsuario(user: User): void {
        this.UsuarioLogeado = user;
    }

    getUsuario(): User {
        return this.UsuarioLogeado;
    }

    isteacher(): boolean {
        return (this.UsuarioLogeado.role == 'teacher')
    }

}