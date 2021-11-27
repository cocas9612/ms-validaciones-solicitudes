import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, LineaInvestigacion, JuradoInvestigacion, EvaluacionSolicitud, TipoJurado} from '../models';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';
import {TipoJuradoRepository} from './tipo-jurado.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly lineaInvestigaciones: HasManyThroughRepositoryFactory<LineaInvestigacion, typeof LineaInvestigacion.prototype.id,
          JuradoInvestigacion,
          typeof Jurado.prototype.id
        >;

  public readonly evaluacionSolicitudes: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Jurado.prototype.id>;

  public readonly id_tipo_jurados: BelongsToAccessor<TipoJurado, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>, @repository.getter('TipoJuradoRepository') protected tipoJuradoRepositoryGetter: Getter<TipoJuradoRepository>,
  ) {
    super(Jurado, dataSource);
    this.id_tipo_jurados = this.createBelongsToAccessorFor('id_tipo_jurados', tipoJuradoRepositoryGetter,);
    this.registerInclusionResolver('id_tipo_jurados', this.id_tipo_jurados.inclusionResolver);
    this.evaluacionSolicitudes = this.createHasManyRepositoryFactoryFor('evaluacionSolicitudes', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitudes', this.evaluacionSolicitudes.inclusionResolver);
    this.lineaInvestigaciones = this.createHasManyThroughRepositoryFactoryFor('lineaInvestigaciones', lineaInvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('lineaInvestigaciones', this.lineaInvestigaciones.inclusionResolver);
  }
}
