import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('webhook')
export class AppController {
  @Get('whatsapp')
  verify(@Query() query: any, @Res() res: Response) {
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    console.log('VERIFY REQUEST:', query);

    if (mode === 'subscribe' && token === 'mi_token_seguro_123') {
      return res.status(200).send(challenge); // 🔥 CLAVE
    }

    return res.status(403).send('error');
  }

  @Post('whatsapp')
  receive(@Req() req: any) {
    console.log('WHATSAPP MESSAGE:', JSON.stringify(req.body, null, 2));
    return { ok: true };
  }
}
