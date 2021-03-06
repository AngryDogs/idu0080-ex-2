package com.ttu.book.management.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class WrongFormatBookPriceException extends RuntimeException{

    public WrongFormatBookPriceException(String message) {
        super(message);
    }
}
