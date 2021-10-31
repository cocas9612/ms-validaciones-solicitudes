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
import {UsuarioJurado} from '../models';
import {UsuarioJuradoRepository} from '../repositories';

export class UsuarioJuradoController {
  constructor(
    @repository(UsuarioJuradoRepository)
    public usuarioJuradoRepository : UsuarioJuradoRepository,
  ) {}

  @post('/usuario-jurados')
  @response(200, {
    description: 'UsuarioJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioJurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {
            title: 'NewUsuarioJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioJurado: Omit<UsuarioJurado, 'id'>,
  ): Promise<UsuarioJurado> {
    return this.usuarioJuradoRepository.create(usuarioJurado);
  }

  @get('/usuario-jurados/count')
  @response(200, {
    description: 'UsuarioJurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioJurado) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.usuarioJuradoRepository.count(where);
  }

  @get('/usuario-jurados')
  @response(200, {
    description: 'Array of UsuarioJurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioJurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioJurado) filter?: Filter<UsuarioJurado>,
  ): Promise<UsuarioJurado[]> {
    return this.usuarioJuradoRepository.find(filter);
  }

  @patch('/usuario-jurados')
  @response(200, {
    description: 'UsuarioJurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {partial: true}),
        },
      },
    })
    usuarioJurado: UsuarioJurado,
    @param.where(UsuarioJurado) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.usuarioJuradoRepository.updateAll(usuarioJurado, where);
  }

  @get('/usuario-jurados/{id}')
  @response(200, {
    description: 'UsuarioJurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioJurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioJurado, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioJurado>
  ): Promise<UsuarioJurado> {
    return this.usuarioJuradoRepository.findById(id, filter);
  }

  @patch('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {partial: true}),
        },
      },
    })
    usuarioJurado: UsuarioJurado,
  ): Promise<void> {
    await this.usuarioJuradoRepository.updateById(id, usuarioJurado);
  }

  @put('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioJurado: UsuarioJurado,
  ): Promise<void> {
    await this.usuarioJuradoRepository.replaceById(id, usuarioJurado);
  }

  @del('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioJuradoRepository.deleteById(id);
  }
}
