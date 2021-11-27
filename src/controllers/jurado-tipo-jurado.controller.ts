import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jurado,
  TipoJurado,
} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoTipoJuradoController {
  constructor(
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
  ) { }

  @get('/jurados/{id}/tipo-jurado', {
    responses: {
      '200': {
        description: 'TipoJurado belonging to Jurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoJurado)},
          },
        },
      },
    },
  })
  async getTipoJurado(
    @param.path.number('id') id: typeof Jurado.prototype.id,
  ): Promise<TipoJurado> {
    return this.juradoRepository.id_tipo_jurados(id);
  }
}
