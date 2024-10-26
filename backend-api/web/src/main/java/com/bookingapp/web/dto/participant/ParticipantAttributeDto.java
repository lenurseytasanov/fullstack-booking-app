package com.bookingapp.web.dto.participant;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantAttributeDto {

    @NotBlank
    @Schema(example = "ИНН", description = "Дополнительный атрибут участника")
    private String name;

    @Schema(description = "Атрибут обязательный или нет")
    private Boolean required;

}
