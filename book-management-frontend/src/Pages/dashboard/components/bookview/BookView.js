import React from 'react';
import BookViewHeader from './BookViewHeader';
import BookViewForm from './BookViewForm';
import BookViewFooter from './BookViewFooter';

const BookView = (props) => (
    <div className="modal fade in" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content"> 
                <BookViewHeader
                    book={props.book}
                    handleCloseBook={props.handleCloseBook}
                />
                <BookViewForm
                    book={props.book}
                    handleInputOnChange={props.handleInputOnChange}
                />
                <BookViewFooter
                    book={props.book}
                    handleCloseBook={props.handleCloseBook}
                    handleSaveBook={props.handleSaveBook}
                    handleDeleteBook={props.handleDeleteBook}
                />
            </div>
        </div>
    </div>
);

export default BookView;