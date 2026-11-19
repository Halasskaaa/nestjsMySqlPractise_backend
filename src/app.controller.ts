import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { NewJatekDto } from './jatek.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getFooldal() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('jatekok')
  @Render('jatekok')
  async getJatek() {
    return {
      jatek: await this.appService.getJatek()
    }
  }

  @Get('macskak')
  @Render('macskak')
  async getMacskak() {
    return {
      macska: await this.appService.getMacskak()
    }
  }

  @Post('jatekok')
  @Render('jatekok')
  async ujJatek(@Body() body: NewJatekDto) {
    await this.appService.Addjatek(
      body.nev
    )
    return this.getJatek()
  }
}
