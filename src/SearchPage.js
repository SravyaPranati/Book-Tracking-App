import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

//It is supposed to search through the list of books and find one that matches your search
class SearchPage extends React.Component {
  state = {
    results: [],
    query: "",
  };
  //the order of which the books show on the Bookshelf
  shelfOrder = (books) => {
    let SearchBooks = this.props.books;
    books.forEach((book) => {
      book.shelf = "none";
      SearchBooks.forEach((SearchBook) => {
        if (book.id === SearchBook.id) {
          book.shelf = SearchBook.shelf;
        }
      });
    });
    return books;
  };
  search = (query) => {
    if (query !== "") {
      BooksAPI.search(query).then((books) => {
        if (!books || books.error) {
          books = this.ShelfOrder(books);
          this.setState(() => {
            return { results: [] };
          });
        } else {
          this.setState({ results: books });
        }
      });
    }
  };
  BookAddition = (book, shelf) => {
    this.props.onChange(book, shelf);
    book.shelf = shelf;
    this.forceUpdate();
  };
  variableUpdate = (event) => {
    let variable = event.target.value;
    this.setState(() => {
      return { query: variable };
    });
    this.search(variable);
  };
  render() {
    return (
      //Search bar
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title/author"
              variable={this.state.query}
              onChange={this.variableUpdate}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 &&
              this.state.results.map((book, index) => (
                //Search results under the bar in the search page
                <Book
                  book={book}
                  key={index}
                  onUpdate={(shelf) => {
                    this.BookAddition(book, shelf);
                  }}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;
