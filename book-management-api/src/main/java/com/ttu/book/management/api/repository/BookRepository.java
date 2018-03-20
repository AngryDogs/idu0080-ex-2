package com.ttu.book.management.api.repository;

import com.ttu.book.management.api.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAll();
    Optional<Book> findBookById(Long id);

    @Query("select u from Book u where " +
            "u.title like %:searchString% " +
            "or u.author like %:searchString% " +
            "or CAST( u.id AS string ) like %:searchString% " +
            "or u.genre like %:searchString% " +
            "or CAST( u.price AS string ) like %:searchString%")
    List<Book> findBookByAllFields(@Param("searchString") String searchString);
}