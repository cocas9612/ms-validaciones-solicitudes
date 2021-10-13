import {Entity, model, property, hasMany} from '@loopback/repository';
import {LineaInvestigacion} from './linea-investigacion.model';
import {JuradoInvestigacion} from './jurado-investigacion.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

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
  telefono?: string;

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

  @hasMany(() => LineaInvestigacion, {through: {model: () => JuradoInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_lineaInvestigacion'}})
  lineaInvestigaciones: LineaInvestigacion[];

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_jurado'})
  evaluacionSolicitudes: EvaluacionSolicitud[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
