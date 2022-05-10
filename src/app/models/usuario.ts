export class Usuario {

    email: string;
    password: string;
    usuario: string;
    FechaCreacion: string;

    constructor(email: string, username: string, password: string, FechaCreacion: string) {
        this.email = email;
        this.password = password;
        this.usuario = username;
        this.FechaCreacion = FechaCreacion;
    }
}
