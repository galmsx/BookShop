import React from "react";
import OptionList from "./OptionList";
import Search from "../../../Search";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      genres: [],
      checkedAuthors: new Set(),
      checkedGenres: new Set(),
      edit : false
    };
    this.authorsFilter = "";
    this.genresFilter = "";
    this.getAuthors();
    this.getGenres();
    this.onCheck = this.onCheck.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  getGenres() {
    var filter = this.genresFilter;
    fetch(`/api/genres?filter=${filter}`)
      .then(res => {
        if (!res.ok) throw new Error(res.text);
        return res.json();
      })
      .then(res => this.setState({ genres: res }))
      .catch(err => console.log(err));
  }
  getAuthors() {
    var filter = this.authorsFilter;
    fetch(`/api/authors?filter=${filter}`)
      .then(res => {
        if (!res.ok) throw new Error(res.text);
        return res.json();
      })
      .then(res =>
        this.setState({
          authors: res.map(el => {
            el.title = el.name;
            return el;
          })
        })
      )
      .catch(err => console.log(err));
  }
  onCheck(id, type) {
    var set;
    if (type == "Genres") {
      set = this.state.checkedGenres;
      if (set.has(id)) set.delete(id);
      else set.add(id);
      this.setState({ checkedGenres: set });
    } else {
      set = this.state.checkedAuthors;
      if (set.has(id)) set.delete(id);
      else set.add(id);
      this.setState({ checkedAuthors: set });
    }
  }
  onFilter(type, value) {
    if (type == "Genres") {
      this.genresFilter = value;
      this.getGenres();
    } else {
      this.authorsFilter = value;
      this.getAuthors();
    }
  }
  onSubmit(ev) {
    ev.preventDefault();
    var data = new FormData();
    data.append("BookFile", this.BookFile.files[0]);
    data.append("CoverFile", this.CoverFile.files[0]);
    data.append("Price", this.Price.value);
    data.append("Pages", this.Pages.value);
    data.append("Descr", this.Descr.value);
    data.append("Authors", Array.from(this.state.checkedAuthors.values()));
    data.append("Genres", Array.from(this.state.checkedGenres.values()));
    data.append("Title", this.Title.value);

    fetch("/api/addbook", {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
      method: "POST",
      body: data
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        location.reload();
      })
      .catch(err => console.log(err));
  }
  onEdit(id, action) {
    if (action == "delete") this.delete(id);
    else this.edit(id);
  }
  delete(id) {
    fetch(`/api/delbook?id=${id}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
      })
      .catch(err => console.log(err));
  }
  edit(id) {
//potom kaknibud
  }

  render() {
    var authors = this.state.authors;
    var genres = this.state.genres;
    var checkedAuthors = this.state.checkedAuthors;
    var checkedGenres = this.state.checkedGenres;
    return (
      <>
        <div className="books-edit-wrapper">
          <div className="cel-form">
            <div>
              <OptionList
                title={"Authors"}
                options={authors}
                checked={checkedAuthors}
                onCheck={this.onCheck}
                onFilter={this.onFilter}
              />
            </div>
            <div>
              <OptionList
                title={"Genres"}
                options={genres}
                checked={checkedGenres}
                onCheck={this.onCheck}
                onFilter={this.onFilter}
              />
            </div>
            <form className="flex-upload" onSubmit={this.onSubmit}>
              <div className="book-upload">
                <label htmlFor="uploadB">Book file:</label>
                <br />
                <input
                  type="file"
                  name=""
                  id="uploadB"
                  ref={ref => (this.BookFile = ref)}
                  required
                />
              </div>
              <div className="book-upload">
                <label htmlFor="uploadC">Cover file:</label>
                <br />
                <input
                  type="file"
                  name=""
                  id="uploadC"
                  ref={ref => (this.CoverFile = ref)}
                />
              </div>
              <div className="book-upload">
                <label htmlFor="">Title:</label>
                <br />
                <input
                  type="Text"
                  ref={ref => {
                    this.Title = ref;
                  }}
                />
              </div>
              <div className="book-upload">
                <label htmlFor="">Price:</label>
                <br />
                <input
                  type="number"
                  min="0"
                  ref={ref => {
                    this.Price = ref;
                  }}
                  required
                />
              </div>

              <div className="book-upload">
                <label htmlFor="">Pages:</label>
                <br />
                <input
                  type="number"
                  min="0"
                  ref={ref => {
                    this.Pages = ref;
                  }}
                  required
                />
              </div>
              <input className="upload" type="submit" value="Upload" />
            </form>
          </div>
          <div className="cel-descr">
            <textarea
              cols="85"
              rows="4"
              placeholder="Description"
              ref={ref => (this.Descr = ref)}
            />
          </div>
        </div>
        <Search editor={this.onEdit} />
      </>
    );
  }
}
export default Books;
