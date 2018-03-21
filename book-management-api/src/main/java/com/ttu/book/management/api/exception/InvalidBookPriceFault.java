package com.ttu.book.management.api.exception;

/**
 * Created by risto on 20.03.2018.
 */
public class InvalidBookPriceFault {
    private String message;

    public InvalidBookPriceFault() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
