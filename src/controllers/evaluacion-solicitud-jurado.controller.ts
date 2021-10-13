import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EvaluacionSolicitud,
  Jurado,
} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';

export class EvaluacionSolicitudJuradoController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
  ) { }

  @get('/evaluacion-solicituds/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to EvaluacionSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof EvaluacionSolicitud.prototype.id,
  ): Promise<Jurado> {
    return this.evaluacionSolicitudRepository.jurados(id);
  }
}
