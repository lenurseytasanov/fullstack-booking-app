package com.bookingapp.core.service;

import com.bookingapp.core.client.S3Client;
import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.repository.FileRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    private final S3Client s3Client;

    public FileEntity getFileEntity(@NonNull UUID id) {
        return fileRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("File with ID '%s' not found".formatted(id)));
    }

    public FileEntity saveFile(@NonNull FileEntity fileEntity, @NonNull InputStream fileData) {
        String s3reference = s3Client.uploadFile(fileData);
        fileEntity.setObjectName(s3reference);
        return fileRepository.save(fileEntity);
    }

    public InputStream getFile(@NonNull UUID fileId) {
        return s3Client.downloadFile(fileId);
    }

}
