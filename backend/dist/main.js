"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const auth_guard_1 = require("./common/guards/auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const jwt_service_1 = require("./auth/jwt.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_1.Reflector);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'null'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-role'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new response_interceptor_1.ResponseInterceptor());
    app.useGlobalGuards(new auth_guard_1.AuthGuard(reflector, app.get(jwt_service_1.JwtService)), new roles_guard_1.RolesGuard(reflector));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Xploreo API')
        .setDescription('Complete backend API for the Xploreo travel platform')
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey', name: 'x-user-id', in: 'header' }, 'x-user-id')
        .addApiKey({ type: 'apiKey', name: 'x-user-role', in: 'header' }, 'x-user-role')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Xploreo API running on http://localhost:${port}/api`);
    console.log(`📚 Swagger docs at  http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map