package com.libtrack.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.libtrack.entity.Book;
import com.libtrack.exception.DuplicateResourceException;
import com.libtrack.repository.BookRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    public Book addBook(Book book) {
        if (book.getAvailability() == null) {
            book.setAvailability(true);
        }
        // Check for duplicate book (same title and author)
        bookRepository.findByTitleIgnoreCaseAndAuthorIgnoreCase(book.getTitle(), book.getAuthor())
            .ifPresent(existingBook -> {
                throw new DuplicateResourceException("Book with title '" + book.getTitle() + "' by author '" + book.getAuthor() + "' already exists.");
            });
        return bookRepository.save(book);
    }
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailabilityTrue();
    }
    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    public List<Book> searchByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }
}