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
import {TipoComite} from '../models';
import {TipoComiteRepository} from '../repositories';

export class TipoComiteController {
  constructor(
    @repository(TipoComiteRepository)
    public tipoComiteRepository : TipoComiteRepository,
  ) {}

  @post('/tipo-comites')
  @response(200, {
    description: 'TipoComite model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoComite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComite, {
            title: 'NewTipoComite',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoComite: Omit<TipoComite, 'id'>,
  ): Promise<TipoComite> {
    return this.tipoComiteRepository.create(tipoComite);
  }

  @get('/tipo-comites/count')
  @response(200, {
    description: 'TipoComite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoComite) where?: Where<TipoComite>,
  ): Promise<Count> {
    return this.tipoComiteRepository.count(where);
  }

  @get('/tipo-comites')
  @response(200, {
    description: 'Array of TipoComite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoComite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoComite) filter?: Filter<TipoComite>,
  ): Promise<TipoComite[]> {
    return this.tipoComiteRepository.find(filter);
  }

  @patch('/tipo-comites')
  @response(200, {
    description: 'TipoComite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComite, {partial: true}),
        },
      },
    })
    tipoComite: TipoComite,
    @param.where(TipoComite) where?: Where<TipoComite>,
  ): Promise<Count> {
    return this.tipoComiteRepository.updateAll(tipoComite, where);
  }

  @get('/tipo-comites/{id}')
  @response(200, {
    description: 'TipoComite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoComite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoComite, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoComite>
  ): Promise<TipoComite> {
    return this.tipoComiteRepository.findById(id, filter);
  }

  @patch('/tipo-comites/{id}')
  @response(204, {
    description: 'TipoComite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComite, {partial: true}),
        },
      },
    })
    tipoComite: TipoComite,
  ): Promise<void> {
    await this.tipoComiteRepository.updateById(id, tipoComite);
  }

  @put('/tipo-comites/{id}')
  @response(204, {
    description: 'TipoComite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoComite: TipoComite,
  ): Promise<void> {
    await this.tipoComiteRepository.replaceById(id, tipoComite);
  }

  @del('/tipo-comites/{id}')
  @response(204, {
    description: 'TipoComite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoComiteRepository.deleteById(id);
  }
}
