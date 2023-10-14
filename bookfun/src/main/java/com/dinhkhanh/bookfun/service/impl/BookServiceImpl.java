package com.dinhkhanh.bookfun.service.impl;

import com.dinhkhanh.bookfun.entity.Book;
import com.dinhkhanh.bookfun.repository.BookRepository;
import com.dinhkhanh.bookfun.service.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository theBookRepository) {
        bookRepository = theBookRepository;
    }

    @Override
    public List<Book> listAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book findById(int theBookId) {

        Optional<Book> result = bookRepository.findById(theBookId);

        Book theBook = null;

        if (result.isPresent()) {
            theBook = result.get();
        } else {
            throw new RuntimeException("Did not find book id - " + theBookId);
        }

        return theBook;
    }

    @Override
    @Transactional
    public Book save(Book theBook) {

        return bookRepository.save(theBook);
    }

    @Override
    @Transactional
    public void deleteById(int theBookId) {

        bookRepository.deleteById(theBookId);
    }
}
