package com.bookingapp.core.service;

import com.bookingapp.core.client.S3Client;
import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.repository.FileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.UUID;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {

    private final FileRepository fileRepository;

    private final S3Client s3Client;

    public FileEntity getFileEntity(@NonNull UUID id) {
        return fileRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("File with ID '%s' not found".formatted(id)));
    }

    public FileEntity saveFile(@NonNull FileEntity fileEntity, @NonNull InputStream fileData) {
        String objectName = UUID.randomUUID().toString();
        s3Client.putObject(objectName, fileData);
        fileEntity.setObjectName(objectName);
        FileEntity saved = fileRepository.save(fileEntity);
        log.info("File '%s' uploaded with object_name '%s'".formatted(saved.getId(), objectName));
        return saved;
    }

    public Supplier<InputStream> getFile(@NonNull UUID fileId) {
        String objectName = fileRepository.findById(fileId).orElseThrow(
                () -> new EntityNotFoundException("File with ID '%s' not found".formatted(fileId))).getObjectName();
        return s3Client.getObject(objectName);
    }

}
