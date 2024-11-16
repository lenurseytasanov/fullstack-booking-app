package com.bookingapp.web.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "CodeSpark booking service",
                description = "API для бронирования мест на мероприятие", version = "1.0.0",
                contact = @Contact(
                        name = "lenurseytasanov",
                        url = "https://github.com/lenurseytasanov"
                )
        ),
        servers = { @Server(url = "https://codesparkbooking.freemyip.com") }
)
public class OpenApiConfig {
}
