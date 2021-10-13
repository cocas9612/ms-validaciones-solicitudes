import {Entity, model, property} from '@loopback/repository';

@model()
export class ComiteSolicitud extends Entity {
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
  respuesta: string;

  @property({
    type: 'number',
  })
  id_solicitud?: number;

  @property({
    type: 'number',
  })
  id_comite?: number;

  constructor(data?: Partial<ComiteSolicitud>) {
    super(data);
  }
}

export interface ComiteSolicitudRelations {
  // describe navigational properties here
}

export type ComiteSolicitudWithRelations = ComiteSolicitud & ComiteSolicitudRelations;
