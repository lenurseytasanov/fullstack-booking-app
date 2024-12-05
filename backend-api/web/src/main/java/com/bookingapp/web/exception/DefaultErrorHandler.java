package com.bookingapp.web.exception;

import com.bookingapp.core.exception.NoAvailablePlacesException;
import com.bookingapp.core.exception.ParticipantAttributeException;
import com.bookingapp.web.dto.exception.ErrorDetails;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class DefaultErrorHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleNotFoundException(EntityNotFoundException ex) {
        log.debug("Requested resource does not exists", ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorDetails(HttpStatus.NOT_FOUND.value(), ex.getMessage()));
    }

    @ExceptionHandler(NoAvailablePlacesException.class)
    public ResponseEntity<ErrorDetails> handleBookingException(NoAvailablePlacesException ex) {
        log.debug("No available places", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorDetails(HttpStatus.BAD_REQUEST.value(), ex.getMessage()));
    }

    @ExceptionHandler(ParticipantAttributeException.class)
    public ResponseEntity<ErrorDetails> handleParticipantAttributeException(ParticipantAttributeException ex) {
        log.debug("Not consistent attributes", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorDetails(HttpStatus.BAD_REQUEST.value(), ex.getMessage()));
    }

}
