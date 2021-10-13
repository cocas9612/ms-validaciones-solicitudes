import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioJurado extends Entity {
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
  clave: string;


  constructor(data?: Partial<UsuarioJurado>) {
    super(data);
  }
}

export interface UsuarioJuradoRelations {
  // describe navigational properties here
}

export type UsuarioJuradoWithRelations = UsuarioJurado & UsuarioJuradoRelations;
