package com.bookingapp.web.dto.exception;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {

    @NotNull @Min(0) @Max(599)
    private Integer code;

    @NotNull
    private String message;

}
