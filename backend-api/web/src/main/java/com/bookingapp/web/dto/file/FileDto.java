package com.bookingapp.web.dto.file;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDto {

    @Schema(description = "ID файла в хранилище")
    private UUID fileId;

    @NotBlank
    @Schema(example = "file.pdf", description = "Имя файла")
    private String name;

    @Min(0)
    @Schema(description = "Размер файла в байтах")
    private Long size;

    @Schema(description = "Дата создания файла")
    private OffsetDateTime createdAt;

}
