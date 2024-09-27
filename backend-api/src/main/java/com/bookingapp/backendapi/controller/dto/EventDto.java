package com.bookingapp.backendapi.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {

    private String name;

    private String description;

    private List<FileUploadDto> files;

    private List<MeetingDto> meetings;

    private List<SignUpFormFieldDto> formFields;

}
