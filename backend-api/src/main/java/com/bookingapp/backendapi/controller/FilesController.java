package com.bookingapp.backendapi.controller;

import com.bookingapp.backendapi.controller.dto.FileUploadDto;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
public class FilesController {

    @PostMapping
    public ResponseEntity<FileUploadDto> upload(@RequestParam("file") MultipartFile file) {
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("id") Long fileId) {
        return null;
    }

}
