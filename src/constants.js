const RESPONSE_MESSAGES = {
  error: {
    addBook: {
      genericError: "Buku gagal ditambahkan",
      invalidReadPage:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      requiredName: "Gagal menambahkan buku. Mohon isi nama buku",
    },
    deleteBook: {
      notFound: "Buku gagal dihapus. Id tidak ditemukan",
    },
    editBook: {
      invalidReadPage:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      notFound: "Gagal memperbarui buku. Id tidak ditemukan",
      requiredName: "Gagal memperbarui buku. Mohon isi nama buku",
    },
    getBook: {
      notFound: "Buku tidak ditemukan",
    },
  },
  success: {
    addBook: "Buku berhasil ditambahkan",
    deleteBook: "Buku berhasil dihapus",
    editBook: "Buku berhasil diperbarui",
  },
};

module.exports = { RESPONSE_MESSAGES };
