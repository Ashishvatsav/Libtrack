package com.libtrack.exception;

public class BookAlreadyReturnedException extends RuntimeException {

    public BookAlreadyReturnedException(String message) {
        super(message);
    }

    public BookAlreadyReturnedException(Long issueId) {
        super("Issue record with ID " + issueId + " has already been returned");
    }
}
