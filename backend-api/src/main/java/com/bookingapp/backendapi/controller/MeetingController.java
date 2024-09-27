package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.MeetingDto;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/meetings")
public class MeetingController {

    @Operation(summary = "Получить событие")
    @GetMapping("/{id}")
    public ResponseEntity<MeetingDto> getMeeting(@PathVariable("id") Long meetingId) {
        return null;
    }

    @Operation(summary = "Записать участника события")
    @PostMapping("/{id}/participants")
    public ResponseEntity<Void> signUpForMeeting(@PathVariable("id") Long meetingId, @RequestBody Map<String, String> participantAttributes) {
        return null;
    }

    @Operation(summary = "Удалить участника события")
    @DeleteMapping("/{id}/participants")
    public ResponseEntity<Void> cancelFromMeeting(@PathVariable("id") Long meetingId) {
        return null;
    }

}
