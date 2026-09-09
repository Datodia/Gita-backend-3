import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { loadOpenApiDocument } from './yaml-loader';

/**
 * Serves the hand-written YAML OpenAPI spec at /docs instead of generating it
 * from controller decorators. Documentation lives in ./docs/*.yaml.
 */
export function setupSwagger(app: INestApplication, path = 'docs'): void {
  const document = loadOpenApiDocument() as any;

  SwaggerModule.setup(path, app, document, {
    jsonDocumentUrl: `${path}/json`,
    yamlDocumentUrl: `${path}/yaml`,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
