package com.ttu.book.management.api.exception;


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
