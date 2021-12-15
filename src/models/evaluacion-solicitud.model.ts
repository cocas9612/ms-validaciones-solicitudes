import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';
import {Solicitud} from './solicitud.model';

@model()
export class EvaluacionSolicitud extends Entity {
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
  fecha_invitacion: string;

  @property({
    type: 'string',
    default: "",
  })
  fecha_respuesta?: string;

  @property({
    type: 'string',
    default: " ",
  })
  respuesta?: string;

  @property({
    type: 'string',
    default: "",
  })
  observaciones?: string;

  @belongsTo(() => Solicitud, {name: 'solicitudes'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'jurados'})
  id_jurado: number;

  @hasOne(() => ResultadoEvaluacion, {keyTo: 'idEvaluacionSolicitud'})
  resultadoEvaluacion: ResultadoEvaluacion;

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud & EvaluacionSolicitudRelations;
