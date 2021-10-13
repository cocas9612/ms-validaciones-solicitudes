import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly solicitudes: BelongsToAccessor<Solicitud, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.solicitudes = this.createBelongsToAccessorFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
