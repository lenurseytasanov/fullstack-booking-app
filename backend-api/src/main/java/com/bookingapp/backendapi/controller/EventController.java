package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.EventDto;
import com.bookingapp.backendapi.controller.dto.EventRequestDto;
import com.bookingapp.backendapi.controller.dto.ParticipantDto;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @Operation(summary = "Создать новой мероприятие")
    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventRequestDto eventRequestDto) {
        return null;
    }

    @Operation(summary = "Редактировать мероприятие")
    @PutMapping("/{id}")
    public ResponseEntity<Void> editEvent(@PathVariable("id") Long eventId, @RequestBody EventRequestDto eventRequestDto) {
        return null;
    }

    @Operation(summary = "Удалить мероприятие")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long eventId) {
        return null;
    }

    @Operation(summary = "Получить мероприятие")
    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable("id") Long eventId) {
        return null;
    }

    @Operation(summary = "Получить список доступных мероприятий")
    @GetMapping
    public ResponseEntity<List<EventDto>> getEvents() {
        return null;
    }

    @Operation(summary = "Получить список участников мероприятия")
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantDto>> getParticipants(
            @PathVariable("id") Long eventId, @RequestParam(required = false) Long page, @RequestParam(required = false) Long size) {
        return null;
    }

}
