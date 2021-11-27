import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesJurado extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<CredencialesJurado>) {
    super(data);
  }
}

export interface CredencialesJuradoRelations {
  // describe navigational properties here
}

export type CredencialesJuradoWithRelations = CredencialesJurado & CredencialesJuradoRelations;
