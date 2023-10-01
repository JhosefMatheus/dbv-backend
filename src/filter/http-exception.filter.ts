import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { SeverityWarningEnum } from '../enum';
import { BadRequest } from '../interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let errorMessage: string = "";
    let severityWarning: SeverityWarningEnum;

    if (exception instanceof UnauthorizedException) {
      errorMessage = "Você não tem autorização para acessar esta funcionalidade.";
      severityWarning = SeverityWarningEnum.WARNING;
    } else {
      (exception.getResponse() as BadRequest).message.forEach((message: string, i: number) => {
        errorMessage = errorMessage.concat(i === (exception.getResponse() as BadRequest).message.length - 1 ? message : message.concat(" "));
      });
      severityWarning = SeverityWarningEnum.ERROR;
    }

    response
      .status(status)
      .json({
        message: errorMessage,
        severityWarning
      });
  }
}