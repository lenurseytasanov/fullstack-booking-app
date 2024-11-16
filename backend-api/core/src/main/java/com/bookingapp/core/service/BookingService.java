package com.bookingapp.core.service;

import com.bookingapp.core.entity.Participant;
import com.bookingapp.core.entity.ParticipantAttribute;
import com.bookingapp.core.entity.ParticipantAttributeData;
import com.bookingapp.core.exception.ParticipantAttributeException;
import com.bookingapp.core.repository.ParticipantRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final ParticipantAttributeService participantAttributeService;

    private final ParticipantRepository participantRepository;

    private final MeetingService meetingService;

    private final EventService eventService;

    public List<Participant> getEventParticipants(@NonNull UUID id, @NonNull Integer page, @NonNull Integer size) {
        validateEvent(id);
        Pageable pageRequest = PageRequest.of(page, size);
        return participantRepository.findAllParticipantsByEventId(id, pageRequest);
    }

    public List<Participant> getEventParticipants(@NonNull UUID id, @NonNull Integer size) {
        validateEvent(id);
        Pageable pageRequest = PageRequest.ofSize(size);
        return participantRepository.findAllParticipantsByEventId(id, pageRequest);
    }

    public List<Participant> getEventParticipants(@NonNull UUID id) {
        validateEvent(id);
        Pageable pageRequest = Pageable.unpaged();
        return participantRepository.findAllParticipantsByEventId(id, pageRequest);
    }

    @Transactional
    public Participant addParticipant(@NonNull UUID eventId, @NonNull List<UUID> meetingIds, @NonNull Map<String, String> participantAttributes) {
        validateEvent(eventId);
        var participant = new Participant();

        Map<String, ParticipantAttribute> eventAttributeMap = participantAttributeService.findEventParticipantAttributes(eventId).stream()
                .collect(Collectors.toMap(ParticipantAttribute::getName, attr -> attr));

        validateParticipantAttributes(participantAttributes, eventAttributeMap);

        participantAttributes.forEach((key, value) -> {
            ParticipantAttribute attribute = eventAttributeMap.get(key);
            ParticipantAttributeData attributeValue = createAttributeData(attribute, value);
            participant.addAttribute(attributeValue);
        });

        meetingIds.stream()
                .map(meetingService::findById)
                .forEach(meeting -> meeting.addParticipant(participant));

        return participantRepository.save(participant);
    }

    private void validateEvent(UUID eventId) {
        eventService.findById(eventId);
    }

    private void validateParticipantAttributes(Map<String, String> participantAttributes, Map<String, ParticipantAttribute> eventAttributeMap) {
        List<String> notUsedAttributes = eventAttributeMap.entrySet().stream()
                .filter(entry -> !participantAttributes.containsKey(entry.getKey()) && entry.getValue().getRequired())
                .map(Map.Entry::getKey).toList();
        if (!notUsedAttributes.isEmpty()) {
            throw new ParticipantAttributeException(
                    "Required participant attributes not used: %s".formatted(String.join(", ", notUsedAttributes)));
        }

        List<String> notAllowedAttributes = participantAttributes.keySet().stream()
                .filter(s -> !eventAttributeMap.containsKey(s)).toList();
        if (!notAllowedAttributes.isEmpty()) {
            throw new ParticipantAttributeException(
                    "Not allowed by event participant attributes: %s".formatted(String.join(", ", notAllowedAttributes)));
        }
    }

    private ParticipantAttributeData createAttributeData(ParticipantAttribute attribute, String value) {
        var attributeValue = new ParticipantAttributeData();
        attributeValue.setValue(value);
        attributeValue.setAttribute(attribute);
        return attributeValue;
    }

}
