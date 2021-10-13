import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Modalidad} from './modalidad.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {TipoComite} from './tipo-comite.model';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Recordatorio} from './recordatorio.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_radicado: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_trabajo: string;

  @property({
    type: 'string',
    default: "",
  })
  archivo?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  @belongsTo(() => Modalidad, {name: 'modalidades'})
  id_modalidad: number;

  @belongsTo(() => TipoSolicitud, {name: 'tipoSolicitudes'})
  id_tipoSolicitud: number;

  @hasMany(() => TipoComite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  tipoComites: TipoComite[];

  @property({
    type: 'number',
  })
  id_lineaInvestigacion?: number;

  @hasMany(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorios: Recordatorio[];

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_solicitud'})
  evaluacionSolicitudes: EvaluacionSolicitud[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
