import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongooseError } from 'mongoose';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 11000:
        return response.status(409).json({
          error: 'Đã tồn tại user',
        });
    }
  }
}
