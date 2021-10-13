import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoComite, TipoComiteRelations} from '../models';

export class TipoComiteRepository extends DefaultCrudRepository<
  TipoComite,
  typeof TipoComite.prototype.id,
  TipoComiteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoComite, dataSource);
  }
}
