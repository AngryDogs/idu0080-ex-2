package com.ttu.book.management.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class InvalidBookException extends RuntimeException {
    private String message;
}