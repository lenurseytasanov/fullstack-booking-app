package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.FileDto;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    @Operation(summary = "Загрузить файл описания мероприятия")
    @PostMapping
    public ResponseEntity<FileDto> upload(@RequestParam("file") MultipartFile file) {
        return null;
    }

    @Operation(summary = "Скачать файл описания мероприятия")
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("id") Long fileId) {
        return null;
    }

}
