export class Usuario {

    email: string;
    password: string;
    username: string;

    constructor(email: string, username: string, password: string) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
