import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SuccessResponseInterceptor } from './common/interceptors/successResponse.interceptor'
import { ValidationPipe } from '@nestjs/common/pipes'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new SuccessResponseInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err)
})
