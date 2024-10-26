package com.bookingapp.web.dto.participant;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantResponseDto extends ParticipantDto {

    @Schema(description = "ID мероприятия")
    private UUID eventId;

    @Schema(description = "ID встречи")
    private UUID meetingId;

}
