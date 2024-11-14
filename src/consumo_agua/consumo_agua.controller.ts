import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';

@Controller('consumo_agua')
export class ConsumoAguaController {
  constructor(private readonly consumoService: ConsumoAguaService) {}

  @Post('registrar')
  async registrarConsumo(
    @Body('usuarioId') usuarioId: string,
    @Body('quantidade') quantidade: number,
    @Body('data') data: Date,
  ) {
    return this.consumoService.registrarConsumo(usuarioId, quantidade, data);
  }

  @Get('historico')
  async consultarHistorico(
    @Query('usuarioId') usuarioId: string,
    @Query('dataInicio') dataInicio: Date,
    @Query('dataFim') dataFim: Date,
  ) {
    return this.consumoService.consultarHistorico(usuarioId, dataInicio, dataFim);
  }

  @Get('alerta')
  async gerarAlerta(@Query('usuarioId') usuarioId: string) {
    return this.consumoService.gerarAlerta(usuarioId);
  }
}