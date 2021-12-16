import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model()
export class Recordatorio extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  resumen: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => Solicitud, {name: 'solicitudes'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'tiene_jurado'})
  id_jurado: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
