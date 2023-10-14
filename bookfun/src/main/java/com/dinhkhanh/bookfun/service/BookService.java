package com.dinhkhanh.bookfun.service;

import com.dinhkhanh.bookfun.entity.Book;

import java.util.List;

public interface BookService {

    List<Book> listAll();

    Book findById(int theBookId);

    Book save(Book theBook);

    void deleteById(int theBookId);
}
