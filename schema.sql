CREATE TABLE books (
    id INTEGER,
    title TEXT NOT NULL,
    author TEXT,
    publisher TEXT,
    num_pages INTEGER,
    description TEXT,
    isbn TEXT,
    isbn13 TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INTEGER, 
    username TEXT NOT NULL, 
    email TEXT NOT NULL, 
    password TEXT NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE saved_books (
    book_id INTEGER,
    user_id INTEGER,
    status INTEGER NOT NULL,
    current_page INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reviews (
    book_id INTEGER,
    user_id INTEGER,
    rating INTEGER NOT NULL,
    review TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
