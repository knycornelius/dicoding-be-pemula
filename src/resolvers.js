const { RESPONSE_MESSAGES } = require("./constants");
const books = require("./data");

const addBookResolver = ({ h, newBookData }) => {
  const { id, name, readPage, pageCount } = newBookData;

  let response;

  if (!name) {
    response = h.response({
      status: "fail",
      message: RESPONSE_MESSAGES.error.addBook.requiredName,
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    response = h.response({
      status: "fail",
      message: RESPONSE_MESSAGES.error.addBook.invalidReadPage,
    });
    response.code(400);
    return response;
  }
  books.push(newBookData);
  const isBookAdded = books.filter((book) => book.id === id).length > 0;

  if (isBookAdded) {
    response = h.response({
      status: "success",
      message: RESPONSE_MESSAGES.success.addBook,
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  response = h.response({
    status: "fail",
    message: RESPONSE_MESSAGES.error.addBook.genericError,
  });
  response.code(500);

  return response;
};

const deleteBookResolver = ({ h, params }) => {
  const { id } = params;

  const index = books.findIndex((book) => book.id === id);

  let response;
  if (index !== -1) {
    books.splice(index, 1);
    response = h.response({
      status: "success",
      message: RESPONSE_MESSAGES.success.deleteBook,
    });
    response.code(200);
    return response;
  }

  response = h.response({
    status: "fail",
    message: RESPONSE_MESSAGES.error.deleteBook.notFound,
  });
  response.code(404);
  return response;
};

const editBookByIdResolver = ({ h, newBookData, params }) => {
  const { name, pageCount, readPage } = newBookData;
  const { bookId: id } = params;

  let response;

  if (!name) {
    response = h.response({
      status: "fail",
      message: RESPONSE_MESSAGES.error.editBook.requiredName,
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    response = h.response({
      status: "fail",
      message: RESPONSE_MESSAGES.error.editBook.invalidReadPage,
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      ...newBookData,
    };
    response = h.response({
      status: "success",
      message: RESPONSE_MESSAGES.success.editBook,
    });
    response.code(200);
    return response;
  }

  response = h.response({
    status: "fail",
    message: RESPONSE_MESSAGES.error.editBook.notFound,
  });
  response.code(404);
  return response;
};

const getAllBooksResolver = ({ h, queryParams }) => {
  const { name, reading, finished } = queryParams;

  let response;

  let booksData = [...books];

  if (name !== undefined) {
    booksData = booksData.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()),
    );
  } else if (reading !== undefined) {
    booksData = booksData.filter(
      (book) => book.reading === !!parseInt(reading),
    );
  } else if (finished !== undefined) {
    booksData = booksData.filter(
      (book) => book.finished === !!parseInt(finished),
    );
  }

  booksData = booksData.map((book) => {
    const { id, name, publisher } = book;
    return {
      id,
      name,
      publisher,
    };
  });

  response = h.response({
    status: "success",
    data: {
      books: booksData,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdResolver = ({ h, params }) => {
  const { id } = params;

  const bookData = books.filter((n) => n.id === id)[0];

  let response;

  if (bookData !== undefined) {
    response = h.response({
      status: "success",
      data: {
        book: bookData,
      },
    });
    response.code(200);
    return response;
  }
  response = h.response({
    status: "fail",
    message: RESPONSE_MESSAGES.error.getBook.notFound,
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookResolver,
  deleteBookResolver,
  editBookByIdResolver,
  getAllBooksResolver,
  getBookByIdResolver,
};
