import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Modalidad, TipoSolicitud, TipoComite, ComiteSolicitud, Recordatorio, EvaluacionSolicitud} from '../models';
import {ModalidadRepository} from './modalidad.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {TipoComiteRepository} from './tipo-comite.repository';
import {RecordatorioRepository} from './recordatorio.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly modalidades: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly tipoSolicitudes: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly tipoComites: HasManyThroughRepositoryFactory<TipoComite, typeof TipoComite.prototype.id,
          ComiteSolicitud,
          typeof Solicitud.prototype.id
        >;

  public readonly recordatorios: HasManyRepositoryFactory<Recordatorio, typeof Solicitud.prototype.id>;

  public readonly evaluacionSolicitudes: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('TipoComiteRepository') protected tipoComiteRepositoryGetter: Getter<TipoComiteRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.evaluacionSolicitudes = this.createHasManyRepositoryFactoryFor('evaluacionSolicitudes', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitudes', this.evaluacionSolicitudes.inclusionResolver);
    this.recordatorios = this.createHasManyRepositoryFactoryFor('recordatorios', recordatorioRepositoryGetter,);
    this.registerInclusionResolver('recordatorios', this.recordatorios.inclusionResolver);
    this.tipoComites = this.createHasManyThroughRepositoryFactoryFor('tipoComites', tipoComiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tipoComites', this.tipoComites.inclusionResolver);
    this.tipoSolicitudes = this.createBelongsToAccessorFor('tipoSolicitudes', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tipoSolicitudes', this.tipoSolicitudes.inclusionResolver);
    this.modalidades = this.createBelongsToAccessorFor('modalidades', modalidadRepositoryGetter,);
    this.registerInclusionResolver('modalidades', this.modalidades.inclusionResolver);
  }
}
