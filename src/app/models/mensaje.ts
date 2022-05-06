export class Mensaje {

    hora: string;
    mensaje: string;
    usuario: string;

    constructor(hora: string, mensaje: string, usuario: string) {
        this.hora = hora;
        this.mensaje = mensaje;
        this.usuario = usuario;
    }
}
