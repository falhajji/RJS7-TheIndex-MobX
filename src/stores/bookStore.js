import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];

  loading = true;

  query = "";

  bookColor = null;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredBooks() {
    return this.books.filter(book =>
      `${book.title}`.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  get filterBooksByColor() {
    return this.filteredBooks.filter(book => book.color === this.bookColor);
  }

  getBookById = id => this.books.find(book => +book.id === +id); //<-- we put the + to convert the id to an integer in case it is a string and vice versa, otherwise we can use parseInt. method (forced integer)

  changeAvailability = id => {
    let tempBook = this.getBookById(id);
    tempBook.available = !tempBook.available;
  };
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed,
  filterBooksByColor: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
