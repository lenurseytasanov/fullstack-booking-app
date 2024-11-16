package com.bookingapp.web.client;

import com.bookingapp.core.client.S3Client;
import com.bookingapp.web.config.MinioProperties;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.function.Supplier;

@Component
@RequiredArgsConstructor
@Slf4j
public class MinioS3Client implements S3Client {

    private final MinioClient minioClient;

    private final MinioProperties minioProperties;

    public Supplier<InputStream> getObject(@NonNull String objectName) {
        return () -> {
            try {
                InputStream inputStream = minioClient.getObject(
                        GetObjectArgs.builder()
                                .bucket(minioProperties.getBucketName())
                                .object(objectName)
                                .build());
                log.debug("Retrieve object '{}' from S3", objectName);
                return inputStream;
            } catch (ErrorResponseException | InsufficientDataException |
                     InternalException | InvalidKeyException | InvalidResponseException |
                     IOException | NoSuchAlgorithmException | ServerException |
                     XmlParserException | IllegalArgumentException e) {
                throw new RuntimeException(e);
            }
        };
    }

    public void putObject(@NonNull String objectName, @NonNull InputStream data) {
        try (data) {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioProperties.getBucketName())
                            .object(objectName)
                            .stream(data, -1, 10485760)
                            .build()
            );
            log.info("Put object '{}' in S3", objectName);
        } catch (IOException | InternalException | XmlParserException | InvalidResponseException | InvalidKeyException |
                 NoSuchAlgorithmException | ErrorResponseException | InsufficientDataException | ServerException e) {
            throw new RuntimeException(e);
        }
    }

}
