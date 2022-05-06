export class Usuario {

    email: string;
    password: string;
    username: string;
    FechaCreacion: string;

    constructor(email: string, username: string, password: string, FechaCreacion: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.FechaCreacion = FechaCreacion;
    }
}
