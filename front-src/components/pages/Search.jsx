import React from "react";
import SearchHead from "../navs/SearchHead";
import BookList from "../navs/BookList";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      books: []
    };
    this.curentPage = 1;
    this.criteria = { field: "", genre: "" };
    this.getGenres();
    this.getBooks();
    this.onEnterHandler = this.onEnterHandler.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  getBooks(page) {
    if (page > 0) page = this.curentPage + 1;
    else if (page < 0) page = this.curentPage - 1;
    else page = this.curentPage;
    var filter = this.criteria.field;
    var genre = this.criteria.genre;
    console.log(genre);

    fetch(`/api/booklist/?page=${page}&filter=${filter}&genre=${genre}`)
      .then(res => {
        if (!res.ok) throw Error(res.status + " - " + res.statusText);
        return res.json();
      })
      .then(res => {
        if (!res.length) return;
        if (res[0] == -1) res = [];
        this.setState({ books: res }, () => (this.curentPage = page));
      })
      .catch(err => console.log(err));
  }

  onEnterHandler(criteria) {
    this.criteria = criteria;
    this.getBooks();
  }
  onEdit(id,action){
    if(action == "delete")
    {
      var books = this.state.books.filter(el=>el.id != id);
      this.setState({books});
      this.props.editor(...arguments);
    }
    else this.props.editor(...arguments);
    
  }

  getGenres() {
    fetch(`/api/genres/`)
      .then(res => {
        if (!res.ok) throw new Error(res.text);
        return res.json();
      })
      .then(res => this.setState({ genres: res }))
      .catch(err => console.log(err));
  }

  render() {
    var editor = this.props.editor ? this.onEdit : null;
    return (
      <main className={editor ? "no-margin" : ""}>
        <SearchHead genres={this.state.genres} onEnter={this.onEnterHandler} />

        <BookList
          books={this.state.books}
          pageChange={this.getBooks}
          editor={editor}
        />
      </main>
    );
  }
}
export default Search;
