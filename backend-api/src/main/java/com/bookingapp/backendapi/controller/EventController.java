package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.EventDto;
import com.bookingapp.backendapi.controller.dto.ParticipantDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    @PostMapping
    public ResponseEntity<Void> createEvent(@RequestBody EventDto eventDto) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editEvent(@PathVariable("id") Long eventId, @RequestBody EventDto eventDto) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long eventId) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable("id") Long eventId) {
        return null;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getEvents() {
        return null;
    }

    @GetMapping(value = "/{id}/participants", params = { "page", "size" })
    public ResponseEntity<List<ParticipantDto>> getParticipants(
            @PathVariable("id") Long eventId, @RequestParam(required = false) Long page, @RequestParam(required = false) Long size) {
        return null;
    }

}
