package com.bende.excpetions;

public class ResourceNotFoundException extends RuntimeException {

    private String message;

    public ResourceNotFoundException() {};

    public ResourceNotFoundException(String message) {
        super(message);
    }

}
