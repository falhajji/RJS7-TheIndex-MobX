import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";
import authorStore from "./stores/authorStore";

class AuthorDetail extends Component {
  state = {
    author: null,
    loading: true
  };

  componentDidMount() {
    authorStore.fetchAuthorByID(this.props.match.params.authorID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      authorStore.fetchAuthorByID(this.props.match.params.authorID);
    }
  }

  render() {
    if (authorStore.loadingAuthor) {
      return <Loading />;
    } else {
      const author = authorStore.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={author.books} />
        </div>
      );
    }
  }
}

export default observer(AuthorDetail);
