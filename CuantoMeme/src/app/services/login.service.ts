import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Http, Response, JsonpModule, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import {User} from '../classes/User.class';
//import {UsuarioService} from './usuarios.service'
import 'rxjs/Rx';
var config = require('../configuration-app/config-app')

@Injectable()
export class LoginService {
	
	isLogged = false;
    user_logged: User;
	userUpdated:EventEmitter<User> = new EventEmitter<User>();

	constructor(private http: Http){
		//this.reqIsLogged();
	}
	
	reqIsLogged() {

        const headers = new Headers({
            'X-Requested-With': 'XMLHttpRequest'
        });

        const options = new RequestOptions({ withCredentials: true, headers });

        this.http.get(URL + 'logIn', options).subscribe(
            response => /*this.processLogInResponse(response)*/console.log("xx"),
            error => {
                if (error.status !== 401) {
                    console.error('Error when asking if logged: ' +
                        JSON.stringify(error));
                }
            }
        );
    }
    
    private parsing_login_response(response){
        var response = response.json()
        var credentials = response.credentials
        var profile = response. profile
        console.log("****")
        console.log(credentials)
        var user = new User(profile['Username'], profile['First Name'], profile['Last Name'], profile['Classroom'], profile['Email'], profile['Phone'], profile['Address'], profile['Postcal Code'], profile['Role'], profile['Birthday'], profile['Folder'])
        user.setCredentials(credentials['access_key'], credentials['secret_key'], credentials['session_token'])
        user.generate_avatar_url(credentials['access_key'], credentials['secret_key'], credentials['session_token'])
        this.user_logged = user

    }

	
    login_talkclass(username: string, password:string, role: string){
        let body = {
            username: username,
            password: password,
            role: role
        }
        return this.http.post(config.aws.apigateway.endpoint+config.aws.apigateway.stage+config.aws.apigateway.name+'/authentication', body).map(
            response => {
                        if (response.status){
                            this.parsing_login_response(response)
                            return this.user_logged
                        }else{
                            console.log(response)
                        }
                        },
            error => {  console.error(error)}
        );
    }
    logOut() {

        return this.http.get('pending' + 'logOut', { withCredentials: true }).map(
            response => {
                this.isLogged = false;
                this.user_logged = null;
                return response;
            }
        );
    }

	setLoggedUser(user: User) {
        this.user_logged = user;
        this.isLogged = true;
		this.userUpdated.emit(this.user_logged);
	}
}
