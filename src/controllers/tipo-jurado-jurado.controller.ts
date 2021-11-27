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
  TipoJurado,
  Jurado,
} from '../models';
import {TipoJuradoRepository} from '../repositories';

export class TipoJuradoJuradoController {
  constructor(
    @repository(TipoJuradoRepository) protected tipoJuradoRepository: TipoJuradoRepository,
  ) { }

  @get('/tipo-jurados/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of TipoJurado has many Jurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.tipoJuradoRepository.jurados(id).find(filter);
  }

  @post('/tipo-jurados/{id}/jurados', {
    responses: {
      '200': {
        description: 'TipoJurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoJurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJuradoInTipoJurado',
            exclude: ['id'],
            optional: ['id_tipo_jurado']
          }),
        },
      },
    }) jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    return this.tipoJuradoRepository.jurados(id).create(jurado);
  }

  @patch('/tipo-jurados/{id}/jurados', {
    responses: {
      '200': {
        description: 'TipoJurado.Jurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Partial<Jurado>,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.tipoJuradoRepository.jurados(id).patch(jurado, where);
  }

  @del('/tipo-jurados/{id}/jurados', {
    responses: {
      '200': {
        description: 'TipoJurado.Jurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Jurado)) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.tipoJuradoRepository.jurados(id).delete(where);
  }
}
