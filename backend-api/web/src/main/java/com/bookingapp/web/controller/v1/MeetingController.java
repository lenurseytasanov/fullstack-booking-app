package com.bookingapp.web.controller.v1;

import com.bookingapp.web.dto.meeting.MeetingResponseDto;
import com.bookingapp.web.dto.participant.ParticipantRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/meetings")
@Tag(name = "Событие")
public class MeetingController {

    @Operation(summary = "Получить событие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = MeetingResponseDto.class)) }),
            @ApiResponse(responseCode = "404", description = "Meeting not found", content = @Content) })
    @GetMapping("/{id}")
    public ResponseEntity<MeetingResponseDto> getMeeting(@Parameter(description = "ID события") @PathVariable("id") Long meetingId) {
        return ResponseEntity.ok(new MeetingResponseDto(UUID.randomUUID(), 10L, OffsetDateTime.now()));
    }

    @Operation(summary = "Записать участника события")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = "Meeting not found"),
            @ApiResponse(responseCode = "400", description = "No available places", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)) }) })
    @PostMapping("/{id}/participants")
    public ResponseEntity<Void> signUpForMeeting(
            @Parameter(description = "ID события") @PathVariable("id") Long meetingId, @RequestBody ParticipantRequestDto participantRequestDto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
