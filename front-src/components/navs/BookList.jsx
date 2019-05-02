import React from "react";
import Card from './BookCard';
import Paging from './Paging';

function BookList({ books, pageChange , editor}) {
  return (
    <div>
      {books.map(el => {
        return (
          <Card
            id={el.id}
            title={el.title}
            authors={el.Authors}
            cover={el.cover}
            desc={el.descr}
            price={el.price}
            genres = {el.Genres}
            mark = {el.mark}
            editor ={editor}
          />
        );
      })}
      <Paging pageChange ={pageChange}/>
    </div>
  );
}
export default BookList;
