package com.bookingapp.web.controller.v1;

import com.bookingapp.core.entity.Event;
import com.bookingapp.core.service.EventService;
import com.bookingapp.web.dto.event.EditEventRequest;
import com.bookingapp.web.dto.event.EventRequest;
import com.bookingapp.web.dto.event.EventResponse;
import com.bookingapp.web.dto.exception.ErrorDetails;
import com.bookingapp.web.mapper.EventMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "Мероприятие")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    private final EventMapper eventMapper;

    @Operation(summary = "Создать новое мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponse.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) })
    })
    @PostMapping
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest eventRequest) {
        Event event = eventMapper.toEntity(eventRequest);
        event = eventService.createEvent(event, eventRequest.getFiles());
        return ResponseEntity.ok(eventMapper.toResponseDto(event));
    }

    @Operation(summary = "Редактировать мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponse.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) })
    })
    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> editEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId,
                                                   @Valid @RequestBody EditEventRequest eventRequest) {
        Event event = eventMapper.toEntity(eventRequest);
        event = eventService.updateEvent(eventId, event, eventRequest.getFiles());
        return ResponseEntity.ok(eventMapper.toResponseDto(event));
    }

    @Operation(summary = "Удалить мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) }),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId) {
        eventService.deleteById(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Получить мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponse.class)) }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) })
    })
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") UUID eventId) {
        return ResponseEntity.ok(eventMapper.toResponseDto(eventService.findById(eventId)));
    }

    @Operation(summary = "Получить список доступных мероприятий")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok") })
    @GetMapping
    public ResponseEntity<List<EventResponse>> getEvents() {
        return ResponseEntity.ok(eventService.findAll().stream()
                .map(eventMapper::toResponseDto).toList());
    }

}
