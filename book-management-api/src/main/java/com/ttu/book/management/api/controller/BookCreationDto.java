package com.ttu.book.management.api.controller;

import com.ttu.book.management.api.exception.InvalidBookException;
import com.ttu.book.management.api.exception.InvalidBookPriceException;
import com.ttu.book.management.api.exception.NegativeBookPriceException;
import com.ttu.book.management.api.exception.WrongFormatBookPriceException;
import com.ttu.book.management.api.model.Book;
import com.ttu.book.management.api.utils.ValidationUtil;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BookCreationDto {

    private String title;
    private String author;
    private String genre;
    private BigDecimal price;

    public boolean valid() {
        return (
            title != null && title.length() > 0 &&
            author != null && author.length() > 0 &&
            genre != null && genre.length() > 0 &&
            price != null && price.compareTo(BigDecimal.ZERO) > 0 && ValidationUtil.getNumberOfDecimalPlaces(price) <= 2
        );
    }

    public Book toBook() {
        return Book
            .builder()
            .title(title)
            .author(author)
            .genre(genre)
            .price(price)
            .build();
    }

    public RuntimeException getException() {
        if (price == null)
            return new InvalidBookPriceException("Price is empty!");
        else if (price.compareTo(BigDecimal.ZERO) < 0)
            return new NegativeBookPriceException("Price is negative!");
        else if (ValidationUtil.getNumberOfDecimalPlaces(price) > 2)
            return new WrongFormatBookPriceException("Price is in wrong format!");
        return new InvalidBookException("Data is invalid!");
    }
}
