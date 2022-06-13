import { bookValues } from 'features/Book/initialAndValidateValues';
import bookApi from 'api/bookApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const KEY = 'book';

export const fetchBooks = createAsyncThunk('fetchBooks', async () => {
  const data = await bookApi.fetchBook();
  return data;
});

export const deleteBook = createAsyncThunk('deleteBook', async (params) => {
  const { bookId } = params;
  await bookApi.deleteBook(bookId);
  return bookId;
});

const bookSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isBookFormVisible: false,
    books: [],
    selectedBook: bookValues.initial,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setBookFormVisible: (state, action) => {
      state.isBookFormVisible = action.payload;
    },

    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    setBookUpdate: (state, action) => {
      state.selectedBook = action.payload;
    },
    setBookDefault: (state) => {
      state.selectedBook = bookValues.initial;
    },
  },
  extraReducers: {
    [fetchBooks.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    },
    [deleteBook.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    [deleteBook.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = bookSlice;
export const {
  setLoading,
  setBookDefault,
  setBookUpdate,
  addBook,
  setBookFormVisible,
} = actions;
export default reducer;
