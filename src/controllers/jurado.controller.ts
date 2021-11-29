import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuraciones} from '../config/configuraciones';
import {CredencialesCambioClave, CredencialesJurado, CredencialesRecuperarClave, Jurado, NotificacionCorreo, NotificacionSms} from '../models';
import {JuradoRepository} from '../repositories';
import {AdministradorDeClavesService, NotificacionesService} from '../services';

export class JuradoController {
  constructor(
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @service(AdministradorDeClavesService)
    public servicioClaves: AdministradorDeClavesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/jurados')
  @response(200, {
    description: 'Jurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    let clave = this.servicioClaves.GenerarClaveAleatoria();
    console.log(clave);
    //Notificar por correo al usuario
    let notificacion = new NotificacionCorreo();
    notificacion.destinatario = jurado.correo;
    notificacion.asunto = "Registro en el sistema";
    notificacion.mensaje = `Hola ${jurado.nombre} <br /> Su clave de acceso al sistema es ${clave} y su usuario es el correo electrónico`;
    this.servicioNotificaciones.EnviarCorreo(notificacion);
    let claveCifrada = this.servicioClaves.CifrarTexto(clave);
    console.log(claveCifrada);
    jurado.clave = claveCifrada;
    return this.juradoRepository.create(jurado);
  }

  @get('/jurados/count')
  @response(200, {
    description: 'Jurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.count(where);
  }

  @get('/jurados')
  @response(200, {
    description: 'Array of Jurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jurado) filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.juradoRepository.find(filter);
  }

  @patch('/jurados')
  @response(200, {
    description: 'Jurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.updateAll(jurado, where);
  }

  @get('/jurados/{id}')
  @response(200, {
    description: 'Jurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jurado, {exclude: 'where'}) filter?: FilterExcludingWhere<Jurado>
  ): Promise<Jurado> {
    return this.juradoRepository.findById(id, filter);
  }

  @patch('/jurados/{id}')
  @response(204, {
    description: 'Jurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.updateById(id, jurado);
  }

  @put('/jurados/{id}')
  @response(204, {
    description: 'Jurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.replaceById(id, jurado);
  }

  @del('/jurados/{id}')
  @response(204, {
    description: 'Jurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoRepository.deleteById(id);
  }

  //SECURITY


  @post("/identificar-jurado", {
    responses: {
      '200': {
        description: "Identificion de usuario"
      }
    }
  })
  async identificar(
    @requestBody() CredencialesJurado: CredencialesJurado
  ): Promise<object | null> {
    let usuario = await this.juradoRepository.findOne({
      where: {
        correo: CredencialesJurado.usuario,
        clave: CredencialesJurado.clave
      }
    });
    if (usuario) {
      usuario.clave = "";
      //consumir MS de token y generar uno nuevo
      //Se asignará ese token a la respuesta para el cliente
    }
    return usuario;
  }

  @post("/recuperar-clave", {
    responses: {
      '200': {
        description: "Recuperación de clave de jurado"
      }
    }
  })
  async recuperarClave(
    @requestBody() credenciales: CredencialesRecuperarClave
  ): Promise<Boolean> {
    let usuario = await this.juradoRepository.findOne({
      where: {
        correo: credenciales.correo
      }
    });
    if (usuario) {
      let clave = this.servicioClaves.GenerarClaveAleatoria();
      console.log(clave);
      let claveCifrada = this.servicioClaves.CifrarTexto(clave);
      console.log(claveCifrada);
      usuario.clave = claveCifrada;
      await this.juradoRepository.updateById(usuario.id, usuario);
      //consumir MS de notificaciones
      let notificacion = new NotificacionSms();
      notificacion.destino = usuario.telefono;
      notificacion.mensaje = `${Configuraciones.saludo_notificaciones} ${usuario.nombre} ${Configuraciones.mensaje_recuperar_clave} ${clave}`;
      this.servicioNotificaciones.EnviarSms(notificacion);
      return true;
    }
    return false;
  }

  @post("/cambiar-clave", {
    responses: {
      '200': {
        description: "Cambio de clave de jurado "
      }
    }
  })
  async cambiarClave(
    @requestBody() datos: CredencialesCambioClave
  ): Promise<Boolean> {
    let usuario = await this.juradoRepository.findById(datos.id);
    if (usuario) {
      if (usuario.clave == datos.clave_actual) {
        usuario.clave = datos.nueva_clave;
        console.log(datos.nueva_clave);
        await this.juradoRepository.updateById(datos.id, usuario);
        //Enviar email  al usuario notificando el cambio de contraseña
        let notificacion = new NotificacionCorreo();
        notificacion.destinatario = usuario.correo;
        notificacion.asunto = Configuraciones.asunto_cambio_clave;
        notificacion.mensaje = `${Configuraciones.saludo_notificaciones} ${usuario.nombre} <br /> ${Configuraciones.mensaje_cambio_clave}`;
        this.servicioNotificaciones.EnviarCorreo(notificacion);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

}
