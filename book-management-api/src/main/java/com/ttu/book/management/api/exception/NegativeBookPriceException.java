package com.ttu.book.management.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class NegativeBookPriceException extends RuntimeException{

    public NegativeBookPriceException(String message) {
        super(message);
    }
}
