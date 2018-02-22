var config = require('../configuration-app/config-app')
export class Multimedia {
    
    public event_title: string;
    public event_date: string;
    public picture_key: string;
    public picture_name: string;
    public picture_url: string;
    public owner: string;
    public tags: string[];


    constructor(picture_key: string, event_title: string, event_date:string,tags: string[], picture_name:string, owner: string){
        this.picture_key = picture_key,
        this.event_title = event_title,
        this.event_date = event_date,
        this.tags = tags
        this.picture_name = picture_name
        this.owner = owner
    }
    generate_multimedia_url(access_key, secret_key, session_token){
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            region: config.aws.region,
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            sessionToken: session_token
          })
        var params = {Bucket: config.aws.s3.bucketresized , Key: this.picture_key};
        this.picture_url = s3.getSignedUrl('getObject', params);
        console.log('The URL for the key '+this.picture_key+' is '+ this.picture_url)
    }

}