package com.bookingapp.web.dto.event;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditEventRequest {

    @NotBlank
    @Schema(example = "Иванов Иван Иванович", description = "ФИО администратора")
    private String adminName;

    @NotBlank
    @Email
    @Schema(example = "ivanov.ivan@mail.ru", description = "Email администратора")
    private String adminEmail;

    @NotBlank
    @Schema(example = "Корпоратив №4913", description = "Название мероприятия")
    private String name;

    @Schema(example = "Описание...", description = "Описание мероприятия")
    private String description;

    private List<UUID> files;

}
