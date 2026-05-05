"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_setup_1 = require("./docs/swagger.setup");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const auth_guard_1 = require("./common/guards/auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_1.Reflector);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new response_interceptor_1.ResponseInterceptor());
    app.useGlobalGuards(new auth_guard_1.AuthGuard(reflector), new roles_guard_1.RolesGuard(reflector));
    (0, swagger_setup_1.setupSwagger)(app);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Xploreo API running on http://localhost:${port}/api`);
    console.log(`📚 Swagger docs at  http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map