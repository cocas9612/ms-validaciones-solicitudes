import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuraciones as config} from '../config/configuraciones';
import {CredencialesJurado, Jurado} from '../models';
import {JuradoRepository} from '../repositories';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionJuradosService {
  constructor(
    @repository(JuradoRepository)
    private juradoRepository: JuradoRepository
  ) { }

  /*
   * Add service methods here
   */

  async ValidarCredenciales(credenciales: CredencialesJurado) {
    let usuario = await this.juradoRepository.findOne({
      where: {
        correo: credenciales.usuario,
        clave: credenciales.clave
      }
    });
    return usuario;
  }

  async CrearToken(usuario: Jurado): Promise<string> {
    let url_crear_token = `${config.url_crear_token}?${config.arg_nombre_token}=${usuario.nombre}&${config.arg_id_persona_token}=${usuario.id}`;
    let token = "";
    await fetch(url_crear_token)
      .then(async (res: any) => {
        token = await res.text();
        console.log(token);
      })
    return token;
  }
}
