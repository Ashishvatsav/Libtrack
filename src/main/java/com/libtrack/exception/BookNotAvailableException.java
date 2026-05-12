package com.libtrack.exception;

public class BookNotAvailableException extends RuntimeException {

    public BookNotAvailableException(String message) {
        super(message);
    }

    public BookNotAvailableException(Long bookId) {
        super("Book with ID " + bookId + " is not available for issue");
    }
}
