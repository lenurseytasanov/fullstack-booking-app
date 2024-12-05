package com.bookingapp.core.service;

import com.bookingapp.core.entity.Event;
import com.bookingapp.core.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;

    private final FileService fileService;

    private static final String EVENT_NOT_FOUND = "Event with ID '%s' not found";

    public Event findById(@NonNull UUID id) {
        return eventRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(EVENT_NOT_FOUND.formatted(id)));
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Transactional
    public Event createEvent(@NonNull Event event, @NonNull List<UUID> fileIds) {
        Event eventRef = eventRepository.save(event);
        fileIds.stream()
                .map(fileService::getFileEntity)
                .forEach(eventRef::addFile);
        log.info("Event '%s' created".formatted(eventRef.getId()));
        return eventRef;
    }

    @Transactional
    public Event updateEvent(@NonNull UUID eventId, @NonNull Event event, @NonNull List<UUID> fileIds) {
        if (!eventRepository.existsById(eventId)) {
            throw new EntityNotFoundException(EVENT_NOT_FOUND.formatted(eventId));
        }
        Event eventRef = eventRepository.findById(eventId).get();
        eventRef.setName(event.getName());
        eventRef.setDescription(event.getDescription());
        eventRef.setAdminName(event.getAdminName());
        eventRef.setAdminEmail(event.getAdminEmail());
        fileIds.stream()
                .map(fileService::getFileEntity)
                .forEach(eventRef::addFile);
        log.info("Event '%s' updated".formatted(eventRef.getId()));
        return eventRef;
    }

    public void deleteById(@NonNull UUID id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException(EVENT_NOT_FOUND.formatted(id));
        }
        eventRepository.deleteById(id);
        log.info("Event '%s' deleted".formatted(id));
    }

}
