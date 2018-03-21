export const ON_SUCCESS = 'ON_SUCCESS';
export const ON_ERROR = 'ON_ERROR';
export const RECONNECTION_DELAY = 100;

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getBookDto(book) {
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
    return dto;
}

async function handleError(response) {
    if (!response.ok) {
        if(response.status === 500)
            throw Error(response.statusText);
        const error = await response.json();
        throw Error(error.message);
    }
    return response;
}

async function getRequestedData(request) {
    
    return request
        .then(handleError)
        .then(response => response.json())
        .then(data => ({ type: ON_SUCCESS, data }))
        .catch(error => ({ type: ON_ERROR, error }));
}

export async function findBooksByKeyword(searchString, interval) {
    const apiEndpoint = !searchString || searchString.length === 0 ?
        '/api/v1/books' : 
        `/api/v1/books?searchString=${searchString}`;

    const request = fetch(apiEndpoint);
    const response = await getRequestedData(request);

    if(response.type === ON_SUCCESS) return response;
    if(!interval) interval = 1;
    if(interval > 10) return response;

    interval++;

    await wait(RECONNECTION_DELAY);

    return findBooksByKeyword(searchString, interval);
}

export async function saveBook(book) {
    const dto = getBookDto(book);
    const bookId = book.id ? book.id : '';
    const apiEndpoint = `/api/v1/books/${bookId}`;

    const request = fetch(apiEndpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: book.id !== null && book.id !== undefined ? 'PUT' : 'POST',
      body: JSON.stringify(dto),
    });

    return await getRequestedData(request);
}

export async function deleteBook(id) {
    if(!id) return; 
    
    const request = fetch(`/api/v1/books/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    });

    return await getRequestedData(request);
}