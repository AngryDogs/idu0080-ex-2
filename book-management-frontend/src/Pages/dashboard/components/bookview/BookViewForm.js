import React from 'react';

const BookViewForm = (props) => (
    <div className="modal-content">   
        <form className="modal-body">
            
            <div className="form-group">
                <label htmlFor="creation-title">Title</label>
                <input
                    className="form-control"
                    value={props.book.title}
                    placeholder="Hitchhiker's guide to the malaxy"
                    id="creation-title"
                    onChange={event => props.handleInputOnChange('title', event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="creation-author">Author</label>
                <input
                    className="form-control"
                    value={props.book.author}
                    placeholder="Uku Something"
                    id="creation-author"
                    onChange={event => props.handleInputOnChange('author', event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="creation-genre">Genre</label>
                <input
                    className="form-control"
                    value={props.book.genre}
                    placeholder="Pie-fi"
                    id="creation-genre"
                    onChange={event => props.handleInputOnChange('genre', event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="creation-price">Price</label>
                <input
                    className="form-control"
                    type="number"
                    value={props.book.price}
                    id="creation-price"
                    onChange={event => props.handleInputOnChange('price', event.target.value)}
                />
            </div>
        </form>
    </div>
);

export default BookViewForm;