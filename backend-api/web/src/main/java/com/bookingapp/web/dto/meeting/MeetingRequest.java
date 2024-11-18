package com.bookingapp.web.dto.meeting;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingRequest {

    @Min(0)
    @Schema(description = "Количество доступных мест")
    private Long availablePlaces;

    @Schema(description = "Дата и время начала")
    private OffsetDateTime startsAt;

}
