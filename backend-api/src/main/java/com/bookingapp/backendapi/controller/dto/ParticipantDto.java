package com.bookingapp.backendapi.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantDto {

    private Map<String, String> additionalFields;

    private String eventId;

    private String meetingId;

}
