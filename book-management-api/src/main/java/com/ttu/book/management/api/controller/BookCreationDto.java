package com.ttu.book.management.api.controller;

import com.ttu.book.management.api.model.Book;
import lombok.Data;

import java.math.BigDecimal;

@Data
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
            price != null && price.compareTo(BigDecimal.ZERO) > 0
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
}
