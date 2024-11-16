package com.bookingapp.core.service;

import com.bookingapp.core.entity.Meeting;
import com.bookingapp.core.entity.Participant;
import com.bookingapp.core.entity.ParticipantAttribute;
import com.bookingapp.core.entity.ParticipantAttributeData;
import com.bookingapp.core.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final ParticipantAttributeService participantAttributeService;

    private final ParticipantRepository participantRepository;

    private final MeetingService meetingService;

    public List<Participant> getEventParticipants(UUID id, Integer page, Integer size) {
        Pageable pageRequest = PageRequest.of(page, size);
        return participantRepository.findAllParticipantsByEventId(id, pageRequest);
    }

    @Transactional
    public Participant addParticipant(UUID eventId, List<UUID> meetingIds, Map<String, String> participantAttributes) {
        var participant = new Participant();

        Map<String, ParticipantAttribute> eventAttributeMap = participantAttributeService.findEventParticipantAttributes(eventId).stream()
                .collect(Collectors.toMap(ParticipantAttribute::getName, attr -> attr));

        Set<ParticipantAttributeData> attributeSet = participantAttributes.entrySet().stream()
                .map(entry -> {
                    var attributeValue = new ParticipantAttributeData();
                    ParticipantAttribute participantAttribute = eventAttributeMap.get(entry.getKey());
                    attributeValue.setValue(entry.getValue());
                    attributeValue.setAttribute(participantAttribute);
                    attributeValue.setParticipant(participant);
                    return attributeValue;
                })
                .collect(Collectors.toSet());
        participant.getParticipantAttributes().addAll(attributeSet);

        List<Meeting> meetings = meetingIds.stream()
                .map(meetingService::findById)
                .peek(meeting -> meeting.getParticipants().add(participant))
                .toList();
        participant.getMeetings().addAll(meetings);

        return participantRepository.save(participant);
    }

}
