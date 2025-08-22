import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SuccessResponse } from '../dto/response.dto'
import { formatToThaiTime } from '../utils/timezoneFormatter'
import { Request, Response } from 'express'

@Injectable()
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const request: Request = context.switchToHttp().getRequest<Request>()
        const response: Response = context
          .switchToHttp()
          .getResponse<Response>()

        return {
          status: response.statusCode,
          message: 'Success',
          data: data,
          timestamp: formatToThaiTime(new Date()), //format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          path: request.url,
        }
      }),
    )
  }
}
