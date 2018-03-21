import React, { Component, Fragment } from 'react';
import Search from './components/search/Search';
import { findBooksByKeyword, ON_SUCCESS, saveBook, deleteBook, ON_ERROR } from './actions';
import Booklist from './components/booklist/Booklist';
import BookView from './components/bookview/BookView';
import Alert from './components/alert/Alert';


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
    onEditError: undefined,
  };

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        
        this.handleShowBook = this.handleShowBook.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
        this.handleCloseBook = this.handleCloseBook.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleSaveBook = this.handleSaveBook.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    componentDidMount() {
        this.searchBooks();
    }

    handleShowBook(book) {
        if(!book) book = initialState.book;
        this.setState({ 
            book: {
                ...book,
                show: true,
            },
        });
    }

    handleCloseBook() {
        this.setState({ 
            book: {
                show: false,
            },
            onEditError: undefined,
        });
    }

    handleInputOnChange(input, value) {
        const newBookState = this.state.book;
        newBookState[input] = value;
        this.setState({ book: newBookState });
    }

    async handleSaveBook(book) {
        const saveBookResponse = await saveBook(book);
        if (saveBookResponse.type === ON_ERROR) {
            this.setState({ onEditError: saveBookResponse.error, loading: false });
            return;
        }
        
        await this.searchBooks();
        this.setState({ book: { ...initialState.book } });
    }

    async handleDeleteBook(id) {
        const deleteBookResponse = await deleteBook(id);
        if (deleteBookResponse.type === ON_ERROR) {
            this.setState({ onEditError: deleteBookResponse.error, loading: false });
            return;
        }
        await this.searchBooks();
        this.setState({ book: { ...initialState.book } });
    }

    async searchBooks(searchString) {
        this.setState({ loading: true });
        const searchBookResponse = await findBooksByKeyword(searchString);

        if (searchBookResponse.type === ON_SUCCESS) 
            this.setState({ books: searchBookResponse.data, loading: false });
        else 
            this.setState({ onSearchError: searchBookResponse.error, loading: false });
    }

    render = () => (
        <Fragment>
            <div className="row m-t-4 p-t-4">
                <div className="col-xs-12 col-lg-8 col-lg-offset-2">
                    <Search onSearchHandler={this.searchBooks} />
                    <Booklist 
                        onBookClick={this.handleShowBook}
                        loading={this.state.loading} 
                        books={this.state.books} 
                    />
                    { this.state.book.show ? (
                        <BookView 
                            book={this.state.book}
                            editError={this.state.onEditError}
                            handleInputOnChange={this.handleInputOnChange}
                            handleCloseBook={this.handleCloseBook}
                            handleSaveBook={this.handleSaveBook}
                            handleDeleteBook={this.handleDeleteBook}
                        />
                        ) : ''
                    }
                    <button className="btn btn-primary btn-block" onClick={() => this.handleShowBook()}>
                        Add a new book
                    </button>
                    <div className="dashboard-alert">
                        {
                            this.state.onSearchError ? (
                                <Alert
                                    information={this.state.onSearchError.message}
                                />
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;