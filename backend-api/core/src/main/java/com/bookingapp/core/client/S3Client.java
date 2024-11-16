package com.bookingapp.core.client;

import java.io.InputStream;
import java.util.UUID;

public interface S3Client {

    String uploadFile(InputStream fileData);

    InputStream downloadFile(UUID fileId);

}
