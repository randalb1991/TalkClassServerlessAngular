export class User {
    private access_key: string = '';
    private secret_key: string = '';
    private session_token: string = '';
    public username: string;
    public first_name: string;
    public last_name: string;
    public classroom: string;
    public email: string;
    public phone: number;
    public address: string;
    public postal_code: string;
    public role: string;
    public birthday: string;
    public profile_picture: string;
    private isLogged: Boolean;
    private avatar: string = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png'

    constructor(username: string, first_name: string, last_name: string, classroom: string, email: string,
        phone: number, address: string, postal_code: string, role: string, birthday: string,
        profile_picture: string) {
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.classroom = classroom;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.postal_code = postal_code;
        this.role = role;
        this.birthday = birthday;
        this.profile_picture = profile_picture
        this.avatar = "https://s3-eu-west-1.amazonaws.com/talkclasstfg-bucket/Profiles/Parents/magaly/skyline.png"
    }
    getRole() {
        return this.role;
    }
    getUsername() {
        return this.username;
    }
    getEmail(): string {
        return this.email;
    }
    setLogged(isLogged: Boolean) {
        this.isLogged = isLogged
    }
    setCredentials(access_key: string, secret_key: string, session_token: string) {
        this.access_key = access_key;
        this.secret_key = secret_key;
        this.session_token = session_token;
    }
    isTeacher(): Boolean {
        var isTeacher = this.role == "teacher"
        console.log("isTeacher: " + isTeacher)
        return (this.role == "teacher")
    }
    get_secret_key(): string {
        return this.secret_key
    }
    get_access_key(): string {
        return this.access_key
    }
    get_session_token(): string {
        return this.session_token
    }
    generate_avatar_url(access_key, secret_key, session_token){
        var AWS = require('aws-sdk');
        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            region: 'us-east-1',
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            sessionToken: session_token
          })
        var params = {Bucket: 'talkclass-tcbucket3332', Key: this.profile_picture};
        this.avatar = s3.getSignedUrl('getObject', params);
            console.log('The URL for tenant '+this.username+' is '+ this.avatar)
    }
}