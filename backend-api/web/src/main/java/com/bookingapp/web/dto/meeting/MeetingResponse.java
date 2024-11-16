package com.bookingapp.web.dto.meeting;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingResponse {

    @Schema(description = "ID в БД")
    private UUID id;

    @Min(0)
    @Schema(description = "Количество доступных мест")
    private Long availablePlaces;

    @Schema(description = "Дата и время начала")
    private OffsetDateTime startsAt;

}
