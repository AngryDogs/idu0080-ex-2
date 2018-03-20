import React from 'react';

const BookViewHeader = (props) => (
    <div className="modal-header">
        <button
            type="button"
            onClick={() => props.handleCloseBook()}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
        >
            <span aria-hidden="true">&times;</span>
        </button>
        <h4 className="modal-title">
            {
                props.book.id === null
                    ? 'Add a new book'
                    : `Edit book #${props.book.id}`
            }
        </h4>
    </div>
);

export default BookViewHeader;