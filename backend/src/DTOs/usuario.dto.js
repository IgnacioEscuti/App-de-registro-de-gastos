export class UsuarioDTO {
  constructor(usuario) {
    this.id = usuario.id;
    this.nombre = usuario.name;
    this.email = usuario.email;
    this.creadoEn = usuario.created_at;
  }
}
