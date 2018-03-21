package com.ttu.book.management.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by risto on 20.03.2018.
 */
@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class InvalidBookPriceException extends RuntimeException {

    private InvalidBookPriceFault faultInfo;

    public InvalidBookPriceException() {
        this("Number is in an incorrect format");
    }

    public InvalidBookPriceException(String s) {
        super(s);

        this.faultInfo = new InvalidBookPriceFault();
        faultInfo.setMessage(s);
    }

    public InvalidBookPriceException(String s, InvalidBookPriceFault faultInfo) {
        super(s);
        this.faultInfo = faultInfo;
    }

    public InvalidBookPriceFault getFaultInfo() {
        return faultInfo;
    }
}
