package com.bookingapp.web.controller.v1;

import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.service.FileService;
import com.bookingapp.web.dto.file.FileDto;
import com.bookingapp.web.mapper.FileMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@RestController
@RequestMapping("/api/v1/files")
@Tag(name = "Файл", description = "API для загрузки и скачивания файлов")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    private final FileMapper fileMapper;

    @Operation(summary = "Загрузить файл описания мероприятия")
    @PostMapping
    public ResponseEntity<FileDto> upload(@NotNull @RequestParam("file") MultipartFile file) throws IOException {
        var fileEntity = new FileEntity();
        fileEntity.setName(file.getOriginalFilename());
        fileEntity.setSize(file.getSize());
        fileEntity.setCreatedAt(OffsetDateTime.now(ZoneOffset.UTC));
        fileEntity = fileService.saveFile(fileEntity, file.getInputStream());
        return ResponseEntity.ok(fileMapper.toDto(fileEntity));
    }

    @Operation(summary = "Скачать файл описания мероприятия")
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@NotNull @Parameter(description = "ID файла") @PathVariable("id") Long fileId) {
        return ResponseEntity.ok(new ByteArrayResource("1234567890".getBytes()));
    }

}
