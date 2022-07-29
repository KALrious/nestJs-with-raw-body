import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
const bodyParser = require("body-parser");


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true, });
  /** until v9.0.5 https://github.com/nestjs/nest/releases/tag/v9.0.5
   *  with this issue https://github.com/nestjs/nest/issues/9901
   * with this PR close https://github.com/nestjs/nest/pull/9926 */
  const rawBodyBuffer = (req: { rawBody: any; }, res: any, buf: Buffer, encoding: any) => {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    };
    app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));

  await app.listen(3000);
}
bootstrap();
