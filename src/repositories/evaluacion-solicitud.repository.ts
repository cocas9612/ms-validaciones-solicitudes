import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, Solicitud, Jurado, ResultadoEvaluacion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly solicitudes: BelongsToAccessor<Solicitud, typeof EvaluacionSolicitud.prototype.id>;

  public readonly jurados: BelongsToAccessor<Jurado, typeof EvaluacionSolicitud.prototype.id>;

  public readonly resultadoEvaluacion: HasOneRepositoryFactory<ResultadoEvaluacion, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.resultadoEvaluacion = this.createHasOneRepositoryFactoryFor('resultadoEvaluacion', resultadoEvaluacionRepositoryGetter);
    this.registerInclusionResolver('resultadoEvaluacion', this.resultadoEvaluacion.inclusionResolver);
    this.jurados = this.createBelongsToAccessorFor('jurados', juradoRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
    this.solicitudes = this.createBelongsToAccessorFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
