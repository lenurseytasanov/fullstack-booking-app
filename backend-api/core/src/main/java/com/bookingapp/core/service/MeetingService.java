package com.bookingapp.core.service;

import com.bookingapp.core.entity.Meeting;
import com.bookingapp.core.repository.MeetingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public Meeting findById(@NonNull UUID id) {
        return meetingRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Meeting with ID '%s' not found".formatted(id)));
    }

}
