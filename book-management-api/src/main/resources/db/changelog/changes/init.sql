CREATE TABLE book (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(50) NOT NULL,
  author VARCHAR(50) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  price DECIMAL(12,2) NOT NULL
);

INSERT INTO book VALUES (1, 'Test title', 'Test author', 'Test genre', 10.00);