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
  Jurado,
  EvaluacionSolicitud,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoEvaluacionSolicitudController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Array of Jurado has many EvaluacionSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EvaluacionSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.juradoRepository.evaluacionSolicitudes(id).find(filter);
  }

  @post('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitudInJurado',
            exclude: ['id'],
            optional: ['id_jurado']
          }),
        },
      },
    }) evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    return this.juradoRepository.evaluacionSolicitudes(id).create(evaluacionSolicitud);
  }

  @patch('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurado.EvaluacionSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: Partial<EvaluacionSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EvaluacionSolicitud)) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.evaluacionSolicitudes(id).patch(evaluacionSolicitud, where);
  }

  @del('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurado.EvaluacionSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EvaluacionSolicitud)) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.juradoRepository.evaluacionSolicitudes(id).delete(where);
  }
}
