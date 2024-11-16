package com.bookingapp.web.mapper;

import com.bookingapp.core.entity.Meeting;
import com.bookingapp.core.entity.Participant;
import com.bookingapp.core.entity.ParticipantAttributeData;
import com.bookingapp.web.dto.participant.ParticipantResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ParticipantMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public ParticipantResponse toResponseDto(Participant participant) {
        ParticipantResponse participantResponse = modelMapper.map(participant, ParticipantResponse.class);
        participantResponse.setAttributes(participant.getParticipantAttributes().stream()
                .collect(Collectors.toMap(attr -> attr.getAttribute().getName(), ParticipantAttributeData::getValue)));
        participantResponse.setMeetingIds(participant.getMeetings().stream().map(Meeting::getId).toList());
        return participantResponse;
    }

}
