package com.bookingapp.web.controller.v1;

import com.bookingapp.web.dto.event.EventDto;
import com.bookingapp.web.dto.event.EventResponseDto;
import com.bookingapp.web.dto.participant.ParticipantResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "Мероприятие")
public class EventController {

    @Operation(summary = "Создать новое мероприятие")
    @ApiResponses(value = {
            @ApiResponse(description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponseDto.class)) }) })
    @PostMapping
    public ResponseEntity<EventResponseDto> createEvent(@RequestBody EventDto eventDto) {
        return null;
    }

    @Operation(summary = "Редактировать мероприятие")
    @PutMapping("/{id}")
    public ResponseEntity<Void> editEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId, @RequestBody EventDto eventDto) {
        return null;
    }

    @Operation(summary = "Удалить мероприятие")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId) {
        return null;
    }

    @Operation(summary = "Получить мероприятие")
    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId) {
        return null;
    }

    @Operation(summary = "Получить список доступных мероприятий")
    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getEvents() {
        return null;
    }

    @Operation(summary = "Получить список участников мероприятия")
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantResponseDto>> getParticipants(
            @Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId,
            @Parameter(description = "Номер страницы") @RequestParam(required = false) Long page,
            @Parameter(description = "Количество записей на странице") @RequestParam(required = false) Long size) {
        return null;
    }

}
