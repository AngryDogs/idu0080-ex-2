import React, { Component, Fragment } from 'react';
import Search from './components/search/Search';
import { findBooksByKeyword, ON_SUCCESS, saveBook, deleteBook } from './actions';
import Booklist from './components/booklist/Booklist';
import BookView from './components/bookview/BookView';


const initialState = {
    books: [],
    loading: false,
    book: {
      show: false,
      id: null,
      title: '',
      author: '',
      genre: '',
      price: 10,
    },
    onSearchError: undefined,
  };

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        
        this.handleShowBook = this.handleShowBook.bind(this);
        this.getSearchBookResponse = this.getSearchBookResponse.bind(this);
        this.handleCloseBook = this.handleCloseBook.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleSaveBook = this.handleSaveBook.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    componentDidMount() {
        this.getSearchBookResponse();
    }

    handleShowBook(book) {
        this.setState({ 
            book: {
                show: true,
                ...book,
            },
        });
    }

    handleCloseBook() {
        this.setState({ 
            book: {
                show: false,
            }
        });
    }

    handleInputOnChange(input, value) {
        const newBookState = this.state.book;
        newBookState[input] = value;
        this.setState({ book: newBookState });
    }

    async handleSaveBook(book) {
        const saveBookResponse = await saveBook(book);
        console.log(saveBookResponse);
    }

    async handleDeleteBook(id) {
        const deleteBookResponse = await deleteBook(id);
        console.log(deleteBookResponse);
    }

    async getSearchBookResponse(searchString) {
        this.setState({ loading: true });
        const searchBookResponse = await findBooksByKeyword(searchString);

        if (searchBookResponse.type === ON_SUCCESS) 
            this.setState({ books: searchBookResponse.data, loading: false });
        else 
            this.setState({ onSearchError: searchBookResponse.data, loading: false });
    }

    render = () => (
        <Fragment>
            <div className="row m-t-4 p-t-4">
                <div className="col-xs-12 col-lg-8 col-lg-offset-2">
                    <Search onSearchHandler={this.getSearchBookResponse} />
                    <Booklist 
                        onBookClick={this.handleShowBook}
                        loading={this.state.loading} 
                        books={this.state.books} 
                    />
                    { this.state.book.show ? (
                        <BookView 
                            book={this.state.book}
                            handleInputOnChange={this.handleInputOnChange}
                            handleCloseBook={this.handleCloseBook}
                            handleSaveBook={this.handleSaveBook}
                            handleDeleteBook={this.handleDeleteBook}
                        />
                        ) : ''
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;