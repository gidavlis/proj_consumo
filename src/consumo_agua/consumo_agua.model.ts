import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ConsumoAgua extends Document {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  data: Date;
}

export const ConsumoAguaSchema = SchemaFactory.createForClass(ConsumoAgua);