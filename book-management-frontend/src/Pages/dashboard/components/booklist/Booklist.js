import React from 'react';

const Booklist = (props) => (
    <div className="list-group">
        {
            props.books.map(book => (
                <a
                    key={book.id}
                    className="list-group-item"
                    onClick={event => props.onBookClick(book)}
                >
                    <h4 className="list-group-item-heading">{book.title}</h4>
                    <p className="list-group-item-text">
                    By {book.author} • {book.genre} • {book.price.toFixed(2)}€
                    </p>
                </a>
            ))
        }
    </div>
);

export default Booklist;