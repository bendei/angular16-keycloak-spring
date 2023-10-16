package com.bende.service;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.time.LocalDateTime;
import com.bende.excpetions.ResourceNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = ResourceNotFoundException.class)
    protected ResponseEntity handleEntityNotFound(
        ResourceNotFoundException ex) {
        ApiError apiError = new ApiError();
        apiError.setStatus("NOT_FOUND .. bizony");
        apiError.setMessage(ex.getMessage());
        apiError.setTimestamp(String.valueOf(LocalDateTime.now()));
        return buildResponseEntity(apiError, NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleValidationExceptions(
        MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ApiError apiError = new ApiError();
        apiError.setStatus(HttpStatus.BAD_REQUEST.toString());
        String text = errors.keySet().stream().map(key -> key + ": " + errors.get(key)).collect(Collectors.joining(","));
        apiError.setMessage(text);
        apiError.setTimestamp(String.valueOf(LocalDateTime.now()));
        return buildResponseEntity(apiError, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ApiError> buildResponseEntity(ApiError apiError, HttpStatus status) {
        return new ResponseEntity<>(apiError, status);
    }

}
