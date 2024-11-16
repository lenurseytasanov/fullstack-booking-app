package com.bookingapp.web.dto.event;

import com.bookingapp.web.dto.file.FileDto;
import com.bookingapp.web.dto.meeting.MeetingResponse;
import com.bookingapp.web.dto.participant.ParticipantAttributeDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventResponse {

    @Schema(description = "ID в БД")
    private UUID id;

    @NotBlank
    @Schema(example = "Иванов Иван Иванович", description = "ФИО администратора")
    private String adminName;

    @NotBlank
    @Schema(example = "ivanov.ivan@mail.ru", description = "Email администратора")
    private String adminEmail;

    @NotBlank
    @Schema(example = "Корпоратив №4913", description = "Название мероприятия")
    private String name;

    @Schema(example = "Описание...", description = "Описание мероприятия")
    private String description;

    private List<FileDto> files;

    private List<MeetingResponse> meetings;

    private List<ParticipantAttributeDto> formFields;

}
