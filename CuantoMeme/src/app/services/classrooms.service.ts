import {
    Classroom
} from '../classes/Classroom.class';
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
} from '../services/login.service';

import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*------test aws---
https://www.npmjs.com/package/aws-api-gateway-client
----------------*/

var config = require('../configuration-app/config-app')

@Injectable()
export class ClassroomsService {
    apigClientFactory = require('aws-api-gateway-client').default;
    config = {
        accessKey: this.ServicioLogin.user_logged.get_access_key(),
        secretKey: this.ServicioLogin.user_logged.get_secret_key(),
        sessionToken: this.ServicioLogin.user_logged.get_session_token(), //OPTIONAL: If you are using temporary credentials you must include the session token
        region: config.aws.region,
        invokeUrl: config.aws.apigateway.endpoint
    }
    apigClient = this.apigClientFactory.newClient(this.config);

    constructor(private http: Http, private ServicioLogin: LoginService) {}

    get_Classrooms() {
        var params = {};
        // Template syntax follows url-template https://www.npmjs.com/package/url-template
        var pathTemplate = config.aws.apigateway.stage+config.aws.apigateway.name+'/classrooms'
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generateClassrooms(result['data'])
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Creating classroom')
                return error}
            );
    }


    generateClassrooms(classrooms: any[]) {
        var lu: Classroom[] = [];
        for (let classroom of classrooms) {
            lu.push(this.generateclass(classroom));
        }
        console.log(lu)
        return lu;
    }
    generateclass(classroom: any) {
        if (classroom['Tutor']) {
            return new Classroom(classroom['Class'], classroom['Level'], classroom['Folder'], classroom['Topic'], classroom['Tutor']);
        } else {
            return new Classroom(classroom['Class'], classroom['Level'], classroom['Folder'], classroom['Topic'], '');
        }
    }
    create_classroom(classroom: string, level: string) {
        var params = {};
        // Template syntax follows url-template https://www.npmjs.com/package/url-template
        var pathTemplate = config.aws.apigateway.stage+config.aws.apigateway.name+'/classrooms'
        var method = 'POST';
        var additionalParams = {};
        let body = {
            class: classroom,
            level: level,
        }
        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return result
                }
            ).catch(
                error => {
                console.log('Invoke API Error => Creating classroom')
                return error}
            );
    }
}