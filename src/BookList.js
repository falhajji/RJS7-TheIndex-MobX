import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "./Loading";
// Components
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

// Store
import bookStore from "./stores/bookStore";

// const instance = axios.create({
//   baseURL: "https://the-index-api.herokuapp.com"
// });

class BookList extends Component {
  // const books = bookStore;

  render() {
    bookStore.bookColor = this.props.match.params.bookColor;
    let books = bookStore.filteredBooks;

    if (bookStore.bookColor) {
      books = bookStore.filterBooksByColor;
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={bookStore.books} />
      </div>
    );
  }
}

export default observer(BookList);
