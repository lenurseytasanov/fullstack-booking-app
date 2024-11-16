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
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
            @ApiResponse(responseCode = "200", description = "Ok") })
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantResponse>> getParticipants(
            @Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId,
            @Parameter(description = "Номер страницы") @RequestParam(required = false) Integer page,
            @Parameter(description = "Количество записей на странице") @RequestParam(required = false) Integer size) {
        return ResponseEntity.ok(bookingService.getEventParticipants(eventId, page, size).stream()
                .map(participantMapper::toResponseDto).toList());
    }

    @Operation(summary = "Записать участника события")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = "Meeting not found"),
            @ApiResponse(responseCode = "400", description = "No available places", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)) }) })
    @PostMapping("/{id}/participants")
    public ResponseEntity<ParticipantResponse> signUpForMeeting(
            @Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId, @RequestBody ParticipantRequest participantRequest) {
        Participant participant = bookingService.addParticipant(eventId, participantRequest.getMeetingIds(), participantRequest.getAttributes());
        return ResponseEntity.ok(participantMapper.toResponseDto(participant));
    }

}
