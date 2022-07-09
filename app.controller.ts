import { Controller, Get, Post, RawBodyRequest, Req} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/slack/command")
  getHello(@Req() req: RawBodyRequest<Request>): string {
    console.log("readable? -->", req.readable);
    console.log("raw ---> ", req.rawBody)
    return this.appService.getHello();
  }
}
