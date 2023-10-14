package com.dinhkhanh.bookfun.controller;

import com.dinhkhanh.bookfun.entity.Book;
import com.dinhkhanh.bookfun.entity.Review;
import com.dinhkhanh.bookfun.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService theBookService) {
        bookService = theBookService;
    }

    @GetMapping("hello-world")
    public String helloWorld() {
        return "Hello world!";
    }

    @GetMapping
    public List<Book> findAll() {
        return bookService.listAll();
    }

    @GetMapping("{theBookId}")
    public Book findById(@PathVariable int theBookId) {

        Book theBook = bookService.findById(theBookId);

        if (theBook == null) {
            throw new RuntimeException("Did not found the book id - " + theBookId);
        }

        return theBook;
    }

    @PostMapping
    public Book add(@RequestBody Book theBook) {

        theBook.setId(0);

        return bookService.save(theBook);
    }

    @PutMapping("{theBookId}")
    public Book update(@RequestBody Book theBook) {

        return bookService.save(theBook);
    }

    @DeleteMapping("{theBookId}")
    public String deleteById(@PathVariable int theBookId) {

        bookService.deleteById(theBookId);

        return "Deleted the book id - " + theBookId;
    }

    @PostMapping("{theBookId}")
    public String addReview(@RequestBody Review theReview,
                            @PathVariable int theBookId) {

        Book theBook = bookService.findById(theBookId);

        if (theBook == null) {
            throw new RuntimeException("Did not found the book id - " + theBookId);
        }

        theReview.setDateTime(LocalDateTime.now());

        theBook.addReview(theReview);

        bookService.save(theBook);

        return "Added the review to book id - " + theBookId;
    }
}
