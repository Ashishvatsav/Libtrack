package com.libtrack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.libtrack.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByAvailabilityTrue();

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByAuthorContainingIgnoreCase(String author);

    Optional<Book> findByTitleIgnoreCaseAndAuthorIgnoreCase(String title, String author);
}
