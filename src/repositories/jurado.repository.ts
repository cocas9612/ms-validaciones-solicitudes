import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, LineaInvestigacion, JuradoInvestigacion, EvaluacionSolicitud} from '../models';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

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

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.evaluacionSolicitudes = this.createHasManyRepositoryFactoryFor('evaluacionSolicitudes', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitudes', this.evaluacionSolicitudes.inclusionResolver);
    this.lineaInvestigaciones = this.createHasManyThroughRepositoryFactoryFor('lineaInvestigaciones', lineaInvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('lineaInvestigaciones', this.lineaInvestigaciones.inclusionResolver);
  }
}
