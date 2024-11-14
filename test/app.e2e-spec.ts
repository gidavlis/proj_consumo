import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ConsumoAguaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/consumo_agua/registrar (POST)', () => {
    return request(app.getHttpServer())
      .post('/consumo_agua/registrar')
      .send({ usuarioId: 'user123', quantidade: 10, data: '2024-11-13' })
      .expect(201)
      .then((response) => {
        expect(response.body.usuarioId).toBe('user123');
        expect(response.body.quantidade).toBe(10);
      });
  });

  it('/consumo_agua/historico (GET)', () => {
    return request(app.getHttpServer())
      .get('/consumo_agua/historico')
      .query({ usuarioId: 'user123', dataInicio: '2024-01-01', dataFim: '2024-12-31' })
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/consumo_agua/alerta (GET)', () => {
    return request(app.getHttpServer())
      .get('/consumo_agua/alerta')
      .query({ usuarioId: 'user123' })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('alerta');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});