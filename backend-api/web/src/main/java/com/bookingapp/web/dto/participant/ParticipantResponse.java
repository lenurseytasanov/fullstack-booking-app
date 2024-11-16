package com.bookingapp.web.dto.participant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantResponse {

    @Schema(description = "ID в БД")
    private UUID id;

    @Schema(description = "Дополнительные атрибуты участника")
    private Map<String, String> attributes;

    @Schema(description = "ID встреч")
    private List<UUID> meetingIds;

}
