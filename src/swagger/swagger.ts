import { SwaggerModule } from '@nestjs/swagger/dist';
import { SWAGGER_CONFIG } from './swagger.config';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access_token',
    )
    .setVersion(SWAGGER_CONFIG.version);
  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }
  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
