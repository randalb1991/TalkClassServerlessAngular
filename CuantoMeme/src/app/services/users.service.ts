import {
    Event
} from '../classes/Evento.class';


import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response,
    JsonpModule,
    RequestOptions,
    Headers
} from '@angular/http';
import {
    LoginService
} from './login.service';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {
    Classroom
} from '../classes/Classroom.class';
import {
    error
} from 'selenium-webdriver';
import {
    User
} from '../classes/User.class';


@Injectable()
export class UsersService {
    apigClientFactory = require('aws-api-gateway-client').default;
    config = {
        accessKey: this.ServicioLogin.user_logged.get_access_key(),
        secretKey: this.ServicioLogin.user_logged.get_secret_key(),
        sessionToken: this.ServicioLogin.user_logged.get_session_token(), //OPTIONAL: If you are using temporary credentials you must include the session token
        region: 'us-east-1',
        invokeUrl: 'https://15psp95at5.execute-api.us-east-1.amazonaws.com'
    }
    apigClient = this.apigClientFactory.newClient(this.config);

    constructor(private http: Http, private router: Router, private ServicioLogin: LoginService) {}

    create_user(username: string, firstname: string, role: string, lastname: string, password: string, birthday: string, email: string, address: string, postal_code: number,
        phone: number, classroom: string, photo_profile: string, photo_profile_name: string) {
        var params = {};
        // Template syntax follows url-template https://www.npmjs.com/package/url-template
        var pathTemplate = '/dev/talkclass/users'
        var method = 'POST';
        var additionalParams = {};
        let body = {
            role: role,
            username: username,
            first_name: firstname,
            last_name: lastname,
            birthday: birthday,
            email: email,
            address: address,
            postal_code: postal_code.toString(),
            phone: phone.toString(),
            password: password,
            photo_profile: photo_profile,
            photo_profile_name: photo_profile_name
        }
        if (role == 'parent') {
            body['classroom'] = classroom
        }
        if ((role == 'teacher') && (classroom)) {
            body['tutor_class'] = classroom
        }
        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return result
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Creating User')
                return error}
            );
    }

    get_users() {
        var params = {};
        var pathTemplate = '/dev/talkclass/users'
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_users(result['data'])
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Getting Users')
                return error}
            );
    }
    generate_users(users: any[]) {
        var lu: User[] = [];
        for (let user of users) {
            lu.push(this.generate_user(user));
        }
        return lu;
    }
    generate_user(user: any) {
        var u = new User(user['Username'], user['First Name'], user['Last Name'], user['Classroom'],
            user['Email'], user['Phone'], user['Address'], user['Postal Code'], user['Role'], user['Birthday'], user['Folder']);
        u.generate_avatar_url(this.ServicioLogin.user_logged.get_access_key(), this.ServicioLogin.user_logged.get_secret_key(),
                              this.ServicioLogin.user_logged.get_session_token())
        return u
        }
    //--------------

    private handleError(error: any) {
        console.error(error);
        return Observable.throw("Server error (" + error.status + "): " + error.text());
    }
}