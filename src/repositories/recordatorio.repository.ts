import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, Solicitud, Jurado} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly solicitudes: BelongsToAccessor<Solicitud, typeof Recordatorio.prototype.id>;

  public readonly tiene_jurado: BelongsToAccessor<Jurado, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.tiene_jurado = this.createBelongsToAccessorFor('tiene_jurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('tiene_jurado', this.tiene_jurado.inclusionResolver);
    this.solicitudes = this.createBelongsToAccessorFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
