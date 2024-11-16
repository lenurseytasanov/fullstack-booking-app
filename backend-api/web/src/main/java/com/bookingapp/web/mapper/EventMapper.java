package com.bookingapp.web.mapper;

import com.bookingapp.core.entity.Event;
import com.bookingapp.core.entity.Meeting;
import com.bookingapp.core.entity.ParticipantAttribute;
import com.bookingapp.web.dto.event.EventRequest;
import com.bookingapp.web.dto.event.EventResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    @PostConstruct
    private void init() {
        modelMapper.createTypeMap(Event.class, EventResponse.class)
                .addMappings(mapper -> mapper.map(Event::getParticipantAttributes, EventResponse::setFormFields))
                .addMappings(mapper -> mapper.map(Event::getFileEntities, EventResponse::setFiles));
    }

    public EventResponse toResponseDto(Event event) {
        return modelMapper.map(event, EventResponse.class);
    }

    public Event toEntity(EventRequest dto) {
        Event entity = modelMapper.map(dto, Event.class);
        entity.getMeetings().addAll(dto.getMeetings().stream()
                .map(meetingDto -> modelMapper.map(meetingDto, Meeting.class))
                .peek(meeting -> meeting.setEvent(entity))
                .toList());
        entity.getParticipantAttributes().addAll(dto.getFormFields().stream()
                .map(participantAttributeDto -> modelMapper.map(participantAttributeDto, ParticipantAttribute.class))
                .peek(participantAttribute -> participantAttribute.setEvent(entity))
                .toList());
        return entity;
    }

}
