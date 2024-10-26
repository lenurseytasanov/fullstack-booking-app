package com.bookingapp.web.controller.v1;

import com.bookingapp.web.dto.file.FileDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/files")
@Tag(name = "Файл", description = "API для загрузки и скачивания файлов")
public class FileController {

    @Operation(summary = "Загрузить файл описания мероприятия")
    @PostMapping
    public ResponseEntity<FileDto> upload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(new FileDto(UUID.randomUUID(), "file.pdf", 1234L, OffsetDateTime.now()));
    }

    @Operation(summary = "Скачать файл описания мероприятия")
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@Parameter(description = "ID файла") @PathVariable("id") Long fileId) {
        return ResponseEntity.ok(new ByteArrayResource("1234567890".getBytes()));
    }

}
