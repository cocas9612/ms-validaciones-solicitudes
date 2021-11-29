import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {JuradoInvestigacion} from './jurado-investigacion.model';
import {LineaInvestigacion} from './linea-investigacion.model';
import {TipoJurado} from './tipo-jurado.model';

@model()
export class Jurado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    default: "",
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @property({
    type: 'string',
  })
  clave?: string;


  @hasMany(() => LineaInvestigacion, {through: {model: () => JuradoInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_lineaInvestigacion'}})
  lineaInvestigaciones: LineaInvestigacion[];

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_jurado'})
  evaluacionSolicitudes: EvaluacionSolicitud[];

  @belongsTo(() => TipoJurado, {name: 'id_tipo_jurados'})
  id_tipo_jurado: number;

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
