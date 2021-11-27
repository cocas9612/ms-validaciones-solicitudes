import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoJurado, TipoJuradoRelations, Jurado} from '../models';
import {JuradoRepository} from './jurado.repository';

export class TipoJuradoRepository extends DefaultCrudRepository<
  TipoJurado,
  typeof TipoJurado.prototype.id,
  TipoJuradoRelations
> {

  public readonly jurados: HasManyRepositoryFactory<Jurado, typeof TipoJurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(TipoJurado, dataSource);
    this.jurados = this.createHasManyRepositoryFactoryFor('jurados', juradoRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
  }
}
