import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(session({
    cookie: {
      maxAge: 60000 * 60 * 24
    },
    secret: 'rejhgffbrgferlkjfijoejioghei',
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
