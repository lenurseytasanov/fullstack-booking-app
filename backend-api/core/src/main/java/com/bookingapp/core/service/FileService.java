package com.bookingapp.core.service;

import com.bookingapp.core.client.S3Client;
import com.bookingapp.core.entity.FileEntity;
import com.bookingapp.core.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    private final S3Client s3Client;

    public FileEntity getFileEntity(UUID id) {
        return fileRepository.findById(id).orElseThrow();
    }

    public FileEntity saveFile(FileEntity fileEntity, InputStream fileData) {
        String s3reference = s3Client.uploadFile(fileData);
        fileEntity.setS3reference(s3reference);
        return fileRepository.save(fileEntity);
    }

    public InputStream getFile(UUID fileId) {
        return s3Client.downloadFile(fileId);
    }

}
