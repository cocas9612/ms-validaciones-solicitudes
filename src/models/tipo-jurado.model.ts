import {Entity, model, property, hasMany} from '@loopback/repository';
import {Jurado} from './jurado.model';

@model()
export class TipoJurado extends Entity {
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

  @hasMany(() => Jurado, {keyTo: 'id_tipo_jurado'})
  jurados: Jurado[];

  constructor(data?: Partial<TipoJurado>) {
    super(data);
  }
}

export interface TipoJuradoRelations {
  // describe navigational properties here
}

export type TipoJuradoWithRelations = TipoJurado & TipoJuradoRelations;
