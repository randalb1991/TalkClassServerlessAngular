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
    Multimedia
} from '../classes/Multimedia.class';


@Injectable()
export class MultimediaService {

    apigClientFactory = require('aws-api-gateway-client').default;
    config = {
        accessKey: this.ServicioLogin.user_logged.get_access_key(),
        secretKey: this.ServicioLogin.user_logged.get_secret_key(),
        sessionToken: this.ServicioLogin.user_logged.get_session_token(), //OPTIONAL: If you are using temporary credentials you must include the session token
        region: 'us-east-1',
        invokeUrl: 'https://15psp95at5.execute-api.us-east-1.amazonaws.com'
    }
    apigClient = this.apigClientFactory.newClient(this.config);
    s3 = null;
    constructor(private http: Http, private router: Router, private ServicioLogin: LoginService) {
        var AWS = require('aws-sdk');
        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            region: 'us-east-1',
            accessKeyId: this.ServicioLogin.user_logged.get_access_key(),
            secretAccessKey: this.ServicioLogin.user_logged.get_secret_key(),
            sessionToken: this.ServicioLogin.user_logged.get_session_token()
          })
           var params2 = {Bucket: 'talkclass-tcbucket3332', Key: 'skater.jpg'};
            var url = this.s3.getSignedUrl('getObject', params2);
            console.log('The URL is', url);
    }
    //---------------------
    get_multimedias() {
        var params = {};
        var pathTemplate = '/dev/talkclass/multimedia'
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_multimedias(result['data'])
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Get Multimedia')
                return error}
            );
    }
    
    get_multimedia_for_event(title: string, date:string){
        var params = {

        };
        var pathTemplate = '/dev/talkclass/multimedia'
        var method = 'GET';
        var additionalParams = {
            queryParams: {
                date:date,
                title: title
            }
        };
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_multimedias(result['data'])
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Gettin Multimedia for event')
                return error}
            );
    }
     

    generate_multimedias(multimedias: any[]) {
        var lu: Multimedia[] = []
        for (let multimedia of multimedias) {
            lu.push(this.generate_multimedia(multimedia))
        }
        return lu
    }

    generate_multimedia(multimedia: Multimedia) {
        var multimedia =  new Multimedia(multimedia['Picture Key'], multimedia['Event'], multimedia['Date'], multimedia['Tags'], multimedia['Title'], multimedia['Username'])
        multimedia.generate_multimedia_url(this.ServicioLogin.user_logged.get_access_key(), this.ServicioLogin.user_logged.get_secret_key(),
          this.ServicioLogin.user_logged.get_session_token())
        return multimedia
    }
    post_multimedia(session_token: string, event_title: string, event_date: string, title: string, file: string) {
        var params = {};
        var pathTemplate = '/dev/talkclass/multimedia'
        var method = 'POST';
        var additionalParams = {};
        var body = {
            session_token: session_token,
            event: event_title,
            event_date: event_date,
            title: title,
            file: file
        }
        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return result
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Creating Multimedia')
                return error
            }
            );
    }

    //--------------

    private handleError(error: any) {
        console.error(error);
        return Observable.throw("Server error (" + error.status + "): " + error.text());
    }
}