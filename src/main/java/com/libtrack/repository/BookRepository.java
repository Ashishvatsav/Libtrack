package com.libtrack.repository;
import com.libtrack.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAvailabilityTrue();
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
}