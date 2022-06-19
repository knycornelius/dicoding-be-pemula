const { nanoid } = require("nanoid");

const {
  addBookResolver,
  getAllBooksResolver,
  getBookByIdResolver,
  deleteBookResolver,
  editBookByIdResolver,
} = require("./resolvers");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid();

  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookData = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  const response = addBookResolver({ h, newBookData });
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const params = request.params;

  const response = deleteBookResolver({ h, params });
  return response;
};

const editBookByIdHandler = (request, h) => {
  const params = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOString();

  const newBookData = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };

  const response = editBookByIdResolver({ h, newBookData, params });
  return response;
};

const getAllBooksHandler = (request, h) => {
  const queryParams = request.query;

  const response = getAllBooksResolver({ h, queryParams });
  return response;
};

const getBookByIdHandler = (request, h) => {
  const params = request.params;

  const response = getBookByIdResolver({ h, params });
  return response;
};

module.exports = {
  addBookHandler,
  deleteBookByIdHandler,
  editBookByIdHandler,
  getAllBooksHandler,
  getBookByIdHandler,
};
