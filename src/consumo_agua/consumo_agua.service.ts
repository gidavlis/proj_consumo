import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  constructor(@InjectModel(ConsumoAgua.name) private consumoModel: Model<ConsumoAgua>) {}

  async registrarConsumo(usuarioId: string, quantidade: number, data: Date) {
    const novoConsumo = new this.consumoModel({ usuarioId, quantidade, data });
    return novoConsumo.save();
  }

  async consultarHistorico(usuarioId: string, dataInicio: Date, dataFim: Date) {
    return this.consumoModel.find({
      usuarioId,
      data: { $gte: dataInicio, $lte: dataFim },
    }).exec();
  }

  async gerarAlerta(usuarioId: string) {
    const consumos = await this.consumoModel.find({ usuarioId }).sort({ data: -1 }).limit(2).exec();
    if (consumos.length === 2 && consumos[0].quantidade > consumos[1].quantidade) {
      return { alerta: true, mensagem: 'Consumo elevado em relação ao mês anterior!' };
    }
    return { alerta: false };
  }
}