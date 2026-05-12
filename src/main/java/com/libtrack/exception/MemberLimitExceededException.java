package com.libtrack.exception;

public class MemberLimitExceededException extends RuntimeException {

    public MemberLimitExceededException(String message) {
        super(message);
    }

    public MemberLimitExceededException(Long memberId) {
        super("Member with ID " + memberId + " has already issued the maximum of 3 books");
    }
}
