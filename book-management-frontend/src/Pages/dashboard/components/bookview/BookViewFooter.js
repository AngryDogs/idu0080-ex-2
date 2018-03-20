import React from 'react';

const BookViewFooter = ( props ) => (
    <div className="modal-footer">
        <button
            onClick={() => props.handleCloseBook()}
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
        >
            Close
        </button>
        <button
            type="button"
            onClick={() => props.handleSaveBook(props.book)}
            className="btn btn-primary"
        >
            Save changes
        </button>
        { 
            props.book.id && (
                <button
                    type="button"
                    onClick={() => props.handleDeleteBook(props.book.id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )
        }
    </div>
);

export default BookViewFooter;