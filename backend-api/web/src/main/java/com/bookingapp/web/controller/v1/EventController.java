package com.bookingapp.web.controller.v1;

import com.bookingapp.web.dto.event.EventRequestDto;
import com.bookingapp.web.dto.event.EventResponseDto;
import com.bookingapp.web.dto.file.FileDto;
import com.bookingapp.web.dto.meeting.MeetingResponseDto;
import com.bookingapp.web.dto.participant.ParticipantAttributeDto;
import com.bookingapp.web.dto.participant.ParticipantResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "Мероприятие")
public class EventController {

    @Operation(summary = "Создать новое мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponseDto.class)) }) })
    @PostMapping
    public ResponseEntity<EventResponseDto> createEvent(@RequestBody EventRequestDto eventRequestDto) {
        return ResponseEntity.ok(
                new EventResponseDto(UUID.randomUUID(), "Иванов Иван Иванович", "email@mail.ru",
                        "Мероприятие №001", "Описание мероприятия",
                        List.of(
                                new FileDto(UUID.randomUUID(), "file1.pdf", 12345L, OffsetDateTime.now()),
                                new FileDto(UUID.randomUUID(), "file2.png", 12345L, OffsetDateTime.now())
                        ),
                        List.of(
                                new MeetingResponseDto(UUID.randomUUID(), 10L, OffsetDateTime.now()),
                                new MeetingResponseDto(UUID.randomUUID(), 5L, OffsetDateTime.now())
                        ),
                        List.of(
                                new ParticipantAttributeDto("phone number", true),
                                new ParticipantAttributeDto("citizenship", false)
                        )
                )
        );
    }

    @Operation(summary = "Редактировать мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok") })
    @PutMapping("/{id}")
    public ResponseEntity<Void> editEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId, @RequestBody EventRequestDto eventRequestDto) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Удалить мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Получить мероприятие")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = EventResponseDto.class)) }) })
    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEvent(@Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId) {
        return ResponseEntity.ok(
                new EventResponseDto(UUID.randomUUID(), "Иванов Иван Иванович", "email@mail.ru",
                        "Мероприятие №001", "Описание мероприятия",
                        List.of(
                                new FileDto(UUID.randomUUID(), "file1.pdf", 12345L, OffsetDateTime.now()),
                                new FileDto(UUID.randomUUID(), "file2.png", 12345L, OffsetDateTime.now())
                        ),
                        List.of(
                                new MeetingResponseDto(UUID.randomUUID(), 10L, OffsetDateTime.now()),
                                new MeetingResponseDto(UUID.randomUUID(), 5L, OffsetDateTime.now())
                        ),
                        List.of(
                                new ParticipantAttributeDto("phone number", true),
                                new ParticipantAttributeDto("citizenship", false)
                        )
                )
        );
    }

    @Operation(summary = "Получить список доступных мероприятий")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok") })
    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getEvents() {
        return ResponseEntity.ok(List.of(
                new EventResponseDto(UUID.randomUUID(), "Иванов Иван Иванович", "email@mail.ru",
                        "Мероприятие №001", "Описание мероприятия",
                        List.of(
                                new FileDto(UUID.randomUUID(), "file1.pdf", 12345L, OffsetDateTime.now()),
                                new FileDto(UUID.randomUUID(), "file2.png", 12345L, OffsetDateTime.now())
                        ),
                        List.of(
                                new MeetingResponseDto(UUID.randomUUID(), 10L, OffsetDateTime.now()),
                                new MeetingResponseDto(UUID.randomUUID(), 5L, OffsetDateTime.now())
                        ),
                        List.of(
                                new ParticipantAttributeDto("phone number", true),
                                new ParticipantAttributeDto("citizenship", false)
                        )
                ),
                new EventResponseDto(UUID.randomUUID(), "Иванов Иван Иванович", "email@mail.ru",
                        "Мероприятие №001", "Описание мероприятия",
                        List.of(
                                new FileDto(UUID.randomUUID(), "file1.pdf", 12345L, OffsetDateTime.now()),
                                new FileDto(UUID.randomUUID(), "file2.png", 12345L, OffsetDateTime.now())
                        ),
                        List.of(
                                new MeetingResponseDto(UUID.randomUUID(), 10L, OffsetDateTime.now()),
                                new MeetingResponseDto(UUID.randomUUID(), 5L, OffsetDateTime.now())
                        ),
                        List.of(
                                new ParticipantAttributeDto("phone number", true),
                                new ParticipantAttributeDto("citizenship", false)
                        )
                )
        ));
    }

    @Operation(summary = "Получить список участников мероприятия")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok") })
    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ParticipantResponseDto>> getParticipants(
            @Parameter(description = "ID мероприятия") @PathVariable("id") Long eventId,
            @Parameter(description = "Номер страницы") @RequestParam(required = false) Long page,
            @Parameter(description = "Количество записей на странице") @RequestParam(required = false) Long size) {
        return ResponseEntity.ok(List.of(
                new ParticipantResponseDto(UUID.randomUUID(), Map.of("aaa", "111", "bbb", "222"), UUID.randomUUID()),
                new ParticipantResponseDto(UUID.randomUUID(), Map.of("aaa", "111", "bbb", "222"), UUID.randomUUID()),
                new ParticipantResponseDto(UUID.randomUUID(), Map.of("aaa", "111", "bbb", "222"), UUID.randomUUID())
        ));
    }

}
