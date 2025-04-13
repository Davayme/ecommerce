import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
@Controller()
export class AppController {
  @Get('/success')
  handleSuccess(@Res() res: Response) {
    return res.send('¡Pago completado con éxito!');
  }

  @Get('/cancel')
  handleCancel(@Res() res: Response) {
    return res.send('El pago fue cancelado.');
  }
}