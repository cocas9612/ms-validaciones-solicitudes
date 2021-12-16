import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recordatorio,
  Jurado,
} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioJuradoController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
  ) { }

  @get('/recordatorios/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof Recordatorio.prototype.id,
  ): Promise<Jurado> {
    return this.recordatorioRepository.tiene_jurado(id);
  }
}
