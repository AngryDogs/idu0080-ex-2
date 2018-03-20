package com.ttu.book.management.api.controller;

import com.ttu.book.management.api.model.Book;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BookUpdateDto {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private BigDecimal price;

    public boolean valid() {
        return (
            (title == null || title.length() > 0) &&
            (author == null || author.length() > 0) &&
            (genre == null || genre.length() > 0) &&
            (price == null || price.compareTo(BigDecimal.ZERO) > 0) &&
            id != null
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

    public Book merge(Book book) {
        return Book
            .builder()
            .id(book.getId())
            .title(title != null ? title : book.getTitle())
            .author(author != null ? author : book.getAuthor())
            .genre(genre != null ? genre : book.getGenre())
            .price(price != null ? price : book.getPrice())
            .build();
    }
}