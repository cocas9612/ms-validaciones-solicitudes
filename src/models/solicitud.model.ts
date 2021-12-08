import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {ComiteSolicitud} from './comite-solicitud.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {LineaInvestigacion} from './linea-investigacion.model';
import {Modalidad} from './modalidad.model';
import {Recordatorio} from './recordatorio.model';
import {TipoComite} from './tipo-comite.model';
import {TipoSolicitud} from './tipo-solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id_modalidad: {
        name: 'fk_solicitud_id_modalidad',
        entity: 'modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad',
      },
      fk_solicitud_id_tipoSolicitud: {
        name: 'fk_solicitud_id_tipoSolicitud',
        entity: 'tiposolicitud',
        entityKey: 'id',
        foreignKey: 'id_tipoSolicitud',
      },
      fk_solicitud_id_recordatorio: {
        name: 'fk_solicitud_id_recordatorio',
        entity: 'recordatorio',
        entityKey: 'id',
        foreignKey: 'id_recordatorio',
      },
      fk_solicitud_id_linea_investigacion: {
        name: 'fk_solicitud_id_linea_investigacion',
        entity: 'lineainvestigacion',
        entityKey: 'id',
        foreignKey: 'id_lineaInvestigacion',
      }
    },
  },
})
export class Solicitud extends Entity {
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



  @belongsTo(() => Modalidad, {name: 'modalidades'})
  id_modalidad: number;

  @belongsTo(() => TipoSolicitud, {name: 'tipoSolicitudes'})
  id_tipoSolicitud: number;

  @hasMany(() => TipoComite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  tipoComites: TipoComite[];

  @hasMany(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorios: Recordatorio[];

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_solicitud'})
  evaluacionSolicitudes: EvaluacionSolicitud[];

  @belongsTo(() => LineaInvestigacion, {name: 'tiene_LineaInvesitgacion'})
  id_LineaInvestigacion: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
