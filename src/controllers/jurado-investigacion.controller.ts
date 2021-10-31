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
import {JuradoInvestigacion} from '../models';
import {JuradoInvestigacionRepository} from '../repositories';

export class JuradoInvestigacionController {
  constructor(
    @repository(JuradoInvestigacionRepository)
    public juradoInvestigacionRepository : JuradoInvestigacionRepository,
  ) {}

  @post('/jurado-investigaciones')
  @response(200, {
    description: 'JuradoInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(JuradoInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoInvestigacion, {
            title: 'NewJuradoInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoInvestigacion: Omit<JuradoInvestigacion, 'id'>,
  ): Promise<JuradoInvestigacion> {
    return this.juradoInvestigacionRepository.create(juradoInvestigacion);
  }

  @get('/jurado-investigaciones/count')
  @response(200, {
    description: 'JuradoInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JuradoInvestigacion) where?: Where<JuradoInvestigacion>,
  ): Promise<Count> {
    return this.juradoInvestigacionRepository.count(where);
  }

  @get('/jurado-investigaciones')
  @response(200, {
    description: 'Array of JuradoInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JuradoInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JuradoInvestigacion) filter?: Filter<JuradoInvestigacion>,
  ): Promise<JuradoInvestigacion[]> {
    return this.juradoInvestigacionRepository.find(filter);
  }

  @patch('/jurado-investigaciones')
  @response(200, {
    description: 'JuradoInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoInvestigacion, {partial: true}),
        },
      },
    })
    juradoInvestigacion: JuradoInvestigacion,
    @param.where(JuradoInvestigacion) where?: Where<JuradoInvestigacion>,
  ): Promise<Count> {
    return this.juradoInvestigacionRepository.updateAll(juradoInvestigacion, where);
  }

  @get('/jurado-investigaciones/{id}')
  @response(200, {
    description: 'JuradoInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JuradoInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JuradoInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<JuradoInvestigacion>
  ): Promise<JuradoInvestigacion> {
    return this.juradoInvestigacionRepository.findById(id, filter);
  }

  @patch('/jurado-investigaciones/{id}')
  @response(204, {
    description: 'JuradoInvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoInvestigacion, {partial: true}),
        },
      },
    })
    juradoInvestigacion: JuradoInvestigacion,
  ): Promise<void> {
    await this.juradoInvestigacionRepository.updateById(id, juradoInvestigacion);
  }

  @put('/jurado-investigaciones/{id}')
  @response(204, {
    description: 'JuradoInvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoInvestigacion: JuradoInvestigacion,
  ): Promise<void> {
    await this.juradoInvestigacionRepository.replaceById(id, juradoInvestigacion);
  }

  @del('/jurado-investigaciones/{id}')
  @response(204, {
    description: 'JuradoInvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoInvestigacionRepository.deleteById(id);
  }
}
