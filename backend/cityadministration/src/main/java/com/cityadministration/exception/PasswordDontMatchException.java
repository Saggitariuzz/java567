package com.cityadministration.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class PasswordDontMatchException extends RuntimeException {

    public PasswordDontMatchException(String message) {
        super(message);
    }

}
