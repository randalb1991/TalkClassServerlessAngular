import {
    Classroom
} from './Classroom.class';


export class Event {

    public title: string;
    public date: string;
    public event_url_picture: string;
    public description: string;
    public classrooms: string[];
    public place: string;
    public event_picture_path: string;
    public tags_event_picture: string[];




    constructor(title: string, description: string, date: string, classrooms: string[], place: string, event_picture_path: string, tags_event_picture: string[]) {
        this.title = title,
            this.description = description,
            this.date = date,
            this.place = place
        this.classrooms = classrooms
        this.event_picture_path = event_picture_path
        this.tags_event_picture = tags_event_picture
    }
    add_classroom(classroom: string) {
        this.classrooms.push(classroom)
    }

    add_classrooms(classrooms: string[]) {
        for (let classroom of classrooms) {
            this.add_classroom(classroom)
        }
    }
    modify_date(date: string) {
        this.date = date
    }
    generate_event_image_url(access_key, secret_key, session_token){
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            region: 'us-east-1',
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            sessionToken: session_token
          })
        var params = {Bucket: 'talkclass-tcbucket3332', Key: this.event_picture_path};
        this.event_url_picture = s3.getSignedUrl('getObject', params);
        console.log('The URL for event '+this.title+' is '+ this.event_url_picture)
    }
}