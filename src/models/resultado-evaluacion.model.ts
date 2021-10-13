import {Entity, model, property} from '@loopback/repository';

@model()
export class ResultadoEvaluacion extends Entity {
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
  resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  formato_diligenciado: string;

  @property({
    type: 'number',
  })
  idEvaluacionSolicitud?: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion & ResultadoEvaluacionRelations;
