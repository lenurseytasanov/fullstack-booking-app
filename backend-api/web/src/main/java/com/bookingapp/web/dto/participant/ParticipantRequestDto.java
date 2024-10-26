package com.bookingapp.web.dto.participant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantRequestDto {

    @Schema(description = "Дополнительные атрибуты участника")
    private Map<String, String> attributes;

}
