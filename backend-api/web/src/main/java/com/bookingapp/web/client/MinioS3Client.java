package com.bookingapp.web.client;

import com.bookingapp.core.client.S3Client;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.UUID;

@Component
public class MinioS3Client implements S3Client {

    @Override
    public String uploadFile(InputStream fileData) {
        return "fosienlsnefsef";
    }

    @Override
    public InputStream downloadFile(UUID fileId) {
        return InputStream.nullInputStream();
    }
}
