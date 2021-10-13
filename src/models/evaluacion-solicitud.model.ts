import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Jurado} from './jurado.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model()
export class EvaluacionSolicitud extends Entity {
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
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_respuesta: string;

  @property({
    type: 'string',
    default: "",
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
