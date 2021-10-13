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
  EvaluacionSolicitud,
  ResultadoEvaluacion,
} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';

export class EvaluacionSolicitudResultadoEvaluacionController {
  constructor(
    @repository(EvaluacionSolicitudRepository) protected evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
  ) { }

  @get('/evaluacion-solicituds/{id}/resultado-evaluacion', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud has one ResultadoEvaluacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResultadoEvaluacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion> {
    return this.evaluacionSolicitudRepository.resultadoEvaluacion(id).get(filter);
  }

  @post('/evaluacion-solicituds/{id}/resultado-evaluacion', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResultadoEvaluacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EvaluacionSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {
            title: 'NewResultadoEvaluacionInEvaluacionSolicitud',
            exclude: ['id'],
            optional: ['idEvaluacionSolicitud']
          }),
        },
      },
    }) resultadoEvaluacion: Omit<ResultadoEvaluacion, 'id'>,
  ): Promise<ResultadoEvaluacion> {
    return this.evaluacionSolicitudRepository.resultadoEvaluacion(id).create(resultadoEvaluacion);
  }

  @patch('/evaluacion-solicituds/{id}/resultado-evaluacion', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.ResultadoEvaluacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {partial: true}),
        },
      },
    })
    resultadoEvaluacion: Partial<ResultadoEvaluacion>,
    @param.query.object('where', getWhereSchemaFor(ResultadoEvaluacion)) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.resultadoEvaluacion(id).patch(resultadoEvaluacion, where);
  }

  @del('/evaluacion-solicituds/{id}/resultado-evaluacion', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.ResultadoEvaluacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ResultadoEvaluacion)) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.resultadoEvaluacion(id).delete(where);
  }
}
