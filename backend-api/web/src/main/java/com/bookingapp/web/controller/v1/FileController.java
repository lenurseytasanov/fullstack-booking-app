package com.bookingapp.web.controller.v1;

import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.service.FileService;
import com.bookingapp.web.dto.exception.ErrorDetails;
import com.bookingapp.web.dto.file.FileDto;
import com.bookingapp.web.mapper.FileMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/files")
@Tag(name = "Файл", description = "API для загрузки и скачивания файлов")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    private final FileMapper fileMapper;

    @Operation(summary = "Загрузить файл описания мероприятия. (Multipart request)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FileDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Validation error", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) })
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FileDto> upload(
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)) @RequestParam("file") MultipartFile file) throws IOException {
        var fileEntity = new FileEntity();
        fileEntity.setName(file.getOriginalFilename());
        fileEntity.setSize(file.getSize());
        fileEntity.setCreatedAt(OffsetDateTime.now(ZoneOffset.UTC));
        fileEntity = fileService.saveFile(fileEntity, file.getInputStream());
        return ResponseEntity.ok(fileMapper.toDto(fileEntity));
    }

    @Operation(summary = "Скачать файл описания мероприятия")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)) })
    })
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@Parameter(description = "ID файла") @PathVariable("id") UUID fileId) throws IOException {
        try (InputStream data = fileService.getFile(fileId).get()) {
            return ResponseEntity.ok(new ByteArrayResource(data.readAllBytes()));
        }
    }

}
