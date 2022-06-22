import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongooseError } from 'mongoose';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log('ERORRRRR:', exception.message);
    return response.status(404).json({
      error: 'Có lỗi xảy ra',
    });
  }
}
