package com.bookingapp.core.service;

import com.bookingapp.core.entity.ParticipantAttribute;
import com.bookingapp.core.repository.ParticipantAttributeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipantAttributeService {

    private final ParticipantAttributeRepository participantAttributeRepository;

    public List<ParticipantAttribute> findEventParticipantAttributes(UUID eventId) {
        return participantAttributeRepository.findByEvent_Id(eventId);
    }

}
