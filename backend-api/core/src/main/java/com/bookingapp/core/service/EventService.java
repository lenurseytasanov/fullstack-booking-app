package com.bookingapp.core.service;

import com.bookingapp.core.entity.Event;
import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final FileService fileService;

    public Event findById(UUID id) {
        return eventRepository.findById(id).orElseThrow();
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Transactional
    public Event createEvent(Event event, List<UUID> fileIds) {
        Event eventRef = eventRepository.save(event);
        List<FileEntity> fileEntities = fileIds.stream()
                .map(fileService::getFileEntity)
                .peek(fileEntity -> fileEntity.setEvent(eventRef))
                .toList();
        eventRef.getFileEntities().addAll(fileEntities);
        return eventRef;
    }

    @Transactional
    public Event updateEvent(UUID eventId, Event event, List<UUID> fileIds) {
        if (!eventRepository.existsById(eventId)) {
            throw new RuntimeException();
        }
        event.setId(eventId);
        Event eventRef = eventRepository.save(event);
        List<FileEntity> fileEntities = fileIds.stream()
                .map(fileService::getFileEntity)
                .peek(fileEntity -> fileEntity.setEvent(eventRef))
                .toList();
        eventRef.getFileEntities().addAll(fileEntities);
        return eventRef;
    }

    public void deleteById(UUID id) {
        eventRepository.deleteById(id);
    }

}
