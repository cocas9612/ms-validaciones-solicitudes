import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Solicitud,
ComiteSolicitud,
TipoComite,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudTipoComiteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/tipo-comites', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many TipoComite through ComiteSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoComite)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TipoComite>,
  ): Promise<TipoComite[]> {
    return this.solicitudRepository.tipoComites(id).find(filter);
  }

  @post('/solicituds/{id}/tipo-comites', {
    responses: {
      '200': {
        description: 'create a TipoComite model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoComite)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComite, {
            title: 'NewTipoComiteInSolicitud',
            exclude: ['id'],
          }),
        },
      },
    }) tipoComite: Omit<TipoComite, 'id'>,
  ): Promise<TipoComite> {
    return this.solicitudRepository.tipoComites(id).create(tipoComite);
  }

  @patch('/solicituds/{id}/tipo-comites', {
    responses: {
      '200': {
        description: 'Solicitud.TipoComite PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComite, {partial: true}),
        },
      },
    })
    tipoComite: Partial<TipoComite>,
    @param.query.object('where', getWhereSchemaFor(TipoComite)) where?: Where<TipoComite>,
  ): Promise<Count> {
    return this.solicitudRepository.tipoComites(id).patch(tipoComite, where);
  }

  @del('/solicituds/{id}/tipo-comites', {
    responses: {
      '200': {
        description: 'Solicitud.TipoComite DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TipoComite)) where?: Where<TipoComite>,
  ): Promise<Count> {
    return this.solicitudRepository.tipoComites(id).delete(where);
  }
}
