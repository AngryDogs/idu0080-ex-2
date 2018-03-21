package com.ttu.book.management.api.controller;

import com.ttu.book.management.api.exception.BookNotFoundException;
import com.ttu.book.management.api.model.Book;
import com.ttu.book.management.api.service.BookManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static liquibase.util.StringUtils.isEmpty;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/api/v1/books")
@RequiredArgsConstructor
public class BookManagementController {

    private final BookManagementService bookManagementService;

    @RequestMapping(method = GET, value = "")
    public List<Book> findAllBooks(@RequestParam(value = "searchString", required = false) String searchString) {
        if(isEmpty(searchString)) return bookManagementService.findAllBooks();
        else return bookManagementService.findBookBySearchString(searchString);
    }

    @RequestMapping(method = POST, value = "")
    public Book createBook(@RequestBody BookCreationDto bookCreationDto) {
        return bookManagementService.createBook(bookCreationDto);
    }

    @RequestMapping(method = PUT, value = "/{id}")
    public Book updateBook(@RequestBody BookUpdateDto bookUpdateDto, @PathVariable Long id) {
        bookUpdateDto.setId(id);
        return bookManagementService.updateBook(bookUpdateDto);
    }

    @RequestMapping(method = GET, value = "/{id}")
    public Book findBookById(@PathVariable("id") Long id) {
        return bookManagementService
                .findBookById(id)
                .orElseThrow(BookNotFoundException::new);
    }

    @RequestMapping(method = DELETE, value = "/{id}")
    public Book deleteBookById(@PathVariable("id") Long id) {
        return bookManagementService
                .deleteBookById(id)
                .orElseThrow(BookNotFoundException::new);
    }
}
