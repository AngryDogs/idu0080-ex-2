package com.ttu.book.management.api.service;

import com.ttu.book.management.api.controller.BookCreationDto;
import com.ttu.book.management.api.controller.BookUpdateDto;
import com.ttu.book.management.api.exception.BookNotFoundException;
import com.ttu.book.management.api.exception.InvalidBookException;
import com.ttu.book.management.api.exception.InvalidBookPriceException;
import com.ttu.book.management.api.model.Book;
import com.ttu.book.management.api.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookManagementService {

    private final BookRepository bookRepository;

    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> findBookById(Long id) {
        return bookRepository.findBookById(id);
    }

    public Book createBook(BookCreationDto bookDto) throws InvalidBookPriceException, InvalidBookException {
        if (bookDto.valid()) {
            return bookRepository.save(bookDto.toBook());
        } else {
            throw bookDto.getException();
        }
    }

    @Transactional
    public Book updateBook(BookUpdateDto bookUpdateDto) {
        if (bookUpdateDto.valid()) {
            Book update = bookRepository
                .findBookById(bookUpdateDto.getId())
                .map(bookUpdateDto::merge)
                .orElseThrow(BookNotFoundException::new);
            return bookRepository.save(update);
        } else {
            throw bookUpdateDto.getException();
        }
    }

    @Transactional
    public Optional<Book> deleteBookById(Long id) {
        return findBookById(id)
                .map(book -> {
                    bookRepository.delete(book.getId());
                    return book;
                });
    }

    @Transactional
    public List<Book> findBookBySearchString(String searchString) {
        return bookRepository.findBookByAllFields(searchString);
    }
}
