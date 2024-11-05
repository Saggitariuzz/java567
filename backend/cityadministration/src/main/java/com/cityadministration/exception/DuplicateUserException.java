package com.cityadministration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateUserException extends RuntimeException{

    public DuplicateUserException(String message) {
        super(message);
    }
}
