package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.MeetingDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/meetings")
public class MeetingController {

    @GetMapping("/{id}")
    public ResponseEntity<MeetingDto> getMeeting(@PathVariable("id") Long meetingId) {
        return null;
    }

    @PostMapping("/{id}/signup")
    public ResponseEntity<Void> signUpForMeeting(@PathVariable("id") Long meetingId, @RequestBody Map<String, String> participantAttributes) {
        return null;
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelFromMeeting(@PathVariable("id") Long meetingId) {
        return null;
    }

}
