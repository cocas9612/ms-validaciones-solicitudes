import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoJurado} from '../models';
import {TipoJuradoRepository} from '../repositories';

export class TipoJuradoController {
  constructor(
    @repository(TipoJuradoRepository)
    public tipoJuradoRepository : TipoJuradoRepository,
  ) {}

  @post('/tipo-jurados')
  @response(200, {
    description: 'TipoJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoJurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoJurado, {
            title: 'NewTipoJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoJurado: Omit<TipoJurado, 'id'>,
  ): Promise<TipoJurado> {
    return this.tipoJuradoRepository.create(tipoJurado);
  }

  @get('/tipo-jurados/count')
  @response(200, {
    description: 'TipoJurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoJurado) where?: Where<TipoJurado>,
  ): Promise<Count> {
    return this.tipoJuradoRepository.count(where);
  }

  @get('/tipo-jurados')
  @response(200, {
    description: 'Array of TipoJurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoJurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoJurado) filter?: Filter<TipoJurado>,
  ): Promise<TipoJurado[]> {
    return this.tipoJuradoRepository.find(filter);
  }

  @patch('/tipo-jurados')
  @response(200, {
    description: 'TipoJurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoJurado, {partial: true}),
        },
      },
    })
    tipoJurado: TipoJurado,
    @param.where(TipoJurado) where?: Where<TipoJurado>,
  ): Promise<Count> {
    return this.tipoJuradoRepository.updateAll(tipoJurado, where);
  }

  @get('/tipo-jurados/{id}')
  @response(200, {
    description: 'TipoJurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoJurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoJurado, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoJurado>
  ): Promise<TipoJurado> {
    return this.tipoJuradoRepository.findById(id, filter);
  }

  @patch('/tipo-jurados/{id}')
  @response(204, {
    description: 'TipoJurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoJurado, {partial: true}),
        },
      },
    })
    tipoJurado: TipoJurado,
  ): Promise<void> {
    await this.tipoJuradoRepository.updateById(id, tipoJurado);
  }

  @put('/tipo-jurados/{id}')
  @response(204, {
    description: 'TipoJurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoJurado: TipoJurado,
  ): Promise<void> {
    await this.tipoJuradoRepository.replaceById(id, tipoJurado);
  }

  @del('/tipo-jurados/{id}')
  @response(204, {
    description: 'TipoJurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoJuradoRepository.deleteById(id);
  }
}
