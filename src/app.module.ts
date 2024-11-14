import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gidalves:172839@cluster0.611ty.mongodb.net/consumo_agua?retryWrites=true&w=majority&appName=Cluster0'),
    ConsumoAguaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}