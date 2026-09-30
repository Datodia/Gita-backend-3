"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const yaml_loader_1 = require("./yaml-loader");
function setupSwagger(app, path = 'docs') {
    const document = (0, yaml_loader_1.loadOpenApiDocument)();
    swagger_1.SwaggerModule.setup(path, app, document, {
        jsonDocumentUrl: `${path}/json`,
        yamlDocumentUrl: `${path}/yaml`,
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
}
//# sourceMappingURL=swagger.setup.js.map