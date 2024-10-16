package com.bookingapp.backendapi.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequestDto {

    private String name;

    private String description;

    private List<FileDto> files;

    private List<MeetingRequestDto> meetings;

    private List<ParticipantAttributeDto> formFields;

}
