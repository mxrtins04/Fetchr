package com.fetchr.exception;

public class AoneroomApiException extends RuntimeException {
    public AoneroomApiException(String message) {
        super(message);
    }

    public AoneroomApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
