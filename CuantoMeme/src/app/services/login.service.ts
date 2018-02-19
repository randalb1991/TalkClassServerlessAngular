import {
    Injectable,
    OnInit,
    EventEmitter
} from '@angular/core';
import {
    Http,
    Response,
    JsonpModule,
    RequestOptions,
    Headers,
    URLSearchParams
} from '@angular/http';
import {
    User
} from '../classes/User.class';
//import {UsuarioService} from './usuarios.service'
import 'rxjs/Rx';
const BASE_URL = "https://15psp95at5.execute-api.us-east-1.amazonaws.com/dev/talkclass/authentication"

@Injectable()
export class LoginService {

    isLogged = false;
    user_logged: User;
    userUpdated: EventEmitter < User > = new EventEmitter < User > ();

    constructor(private http: Http) {
        //this.reqIsLogged();
    }

    reqIsLogged() {

        const headers = new Headers({
            'X-Requested-With': 'XMLHttpRequest'
        });

        const options = new RequestOptions({
            withCredentials: true,
            headers
        });

        this.http.get(URL + 'logIn', options).subscribe(
            response => /*this.processLogInResponse(response)*/ console.log("xx"),
            error => {
                if (error.status !== 401) {
                    console.error('Error when asking if logged: ' +
                        JSON.stringify(error));
                }
            }
        );
    }

    private parsing_login_response(response) {
        var response = response.json()
        var credentials = response.credentials
        var profile = response.profile
        console.log("****")
        console.log(credentials)
        var user = new User(profile['Username'], profile['First Name'], profile['Last Name'], profile['Classroom'], profile['Email'], profile['Phone'], profile['Address'], profile['Postcal Code'], profile['Role'], profile['Birthday'], profile['Folder'])
        user.setCredentials(credentials['access_key'], credentials['secret_key'], credentials['session_token'])
        user.generate_avatar_url(credentials['access_key'], credentials['secret_key'], credentials['session_token'])
        this.user_logged = user

    }


    login_talkclass(username: string, password: string, role: string) {
        let body = {
            username: username,
            password: password,
            role: role
        }
        return this.http.post(BASE_URL, body).map(
            response => {
                if (response.status) {
                    this.parsing_login_response(response)
                    return this.user_logged
                } else {
                    console.log(response)
                }
            },
            error => {
                console.error(error)
            }
        );
    }
    signup(username: string, email: string, pass: string) {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        });
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('pass', pass);
        params.append('email', email);
        const options = new RequestOptions();
        options.withCredentials = true;
        options.search = params;
        options.headers = headers;
        var url = BASE_URL + 'signup';
        console.log(url)
        return this.http.post(url, null, options).map(
            response => {
                return response.status
            },
            error => console.error(error)
        );
    }
    logOut() {

        return this.http.get(BASE_URL + 'logOut', {
            withCredentials: true
        }).map(
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