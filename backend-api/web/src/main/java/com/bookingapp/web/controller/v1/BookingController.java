package com.bookingapp.web.controller.v1;

import com.bookingapp.core.entity.Participant;
import com.bookingapp.core.service.BookingService;
import com.bookingapp.web.dto.participant.ParticipantRequest;
import com.bookingapp.web.dto.participant.ParticipantResponse;
import com.bookingapp.web.mapper.ParticipantMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
@Tag(name = "Запись на мероприятие")
public class BookingController {

    private final BookingService bookingService;

    private final ParticipantMapper participantMapper;

    @Operation(summary = "Получить список участников мероприятия")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    })
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantResponse>> getParticipants(
            @Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId,
            @Parameter(description = "Номер страницы") @RequestParam(required = false) @Min(0) Integer page,
            @Parameter(description = "Количество записей на странице") @RequestParam(required = false) @Min(1) Integer size) {
        List<Participant> participants;
        if (page != null && size != null) {
            participants = bookingService.getEventParticipants(eventId, page, size);
        } else if (page == null && size != null) {
            participants = bookingService.getEventParticipants(eventId, size);
        } else {
            participants = bookingService.getEventParticipants(eventId);
        }
        return ResponseEntity.ok(participants.stream()
                .map(participantMapper::toResponseDto).toList());
    }

    @Operation(summary = "Записать участника события")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ParticipantResponse.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "No available places", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Wrong participant attributes set", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    })
    @PostMapping("/{id}/participants")
    public ResponseEntity<ParticipantResponse> signUpForMeeting(
            @Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId,
            @Valid @RequestBody ParticipantRequest participantRequest) {
        Participant participant = bookingService.addParticipant(eventId, participantRequest.getMeetingIds(), participantRequest.getAttributes());
        return ResponseEntity.ok(participantMapper.toResponseDto(participant));
    }

}
