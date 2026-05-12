package com.libtrack.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.libtrack.entity.Book;
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAvailabilityTrue();
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
}