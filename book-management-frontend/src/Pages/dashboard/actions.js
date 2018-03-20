export const ON_SUCCESS = 'ON_SUCCESS';
export const ON_ERROR = 'ON_ERROR';

export async function findBooksByKeyword(searchString) {
    const apiEndpoint = !searchString || searchString.length === 0 ?
        '/api/v1/books' : 
        `/api/v1/books?searchString=${searchString}`;

    const response = await fetch(apiEndpoint);
    const data = await response.json();

    const type = response.status === 200 ? ON_SUCCESS : ON_ERROR;

    return { type, data };
}

export async function saveBook(book) {
    const dto = {};
    if (book.title) {
      dto.title = book.title;
    }
    if (book.author) {
      dto.author = book.author;
    }
    if (book.genre) {
      dto.genre = book.genre;
    }
    if (book.price) {
      dto.price = book.price;
    }
    return await fetch(`/api/v1/books${book.id !== null && book.id !== undefined ? `/${book.id}` : ''}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: book.id !== null && book.id !== undefined ? 'PUT' : 'POST',
      body: JSON.stringify(dto),
    });
}

export async function deleteBook(id) {
    if(!id) return; 
    
    return await fetch(`/api/v1/books/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    });
}