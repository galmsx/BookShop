import React from "react";
import MultiButton from './MultiButton';

function BookInf({book}){
    return <div className="book-inf">
   <img src={book.cover || "/covers/none.png"} alt="cover"  />
   <div className="info">

       <h1>{book.title}</h1>

       <div className="table">
       <div className="table-inf">
       <strong>Authors:</strong><br/> <span>{book.Authors.join(", ")}</span>
       </div>
       <div className="table-inf">
       <strong>Genres:</strong><br/> <span>{book.Genres.join(", ")}</span>
       </div>
       <div className="table-inf">
       <strong>Price:</strong><br/> <span>{book.price}</span>
       </div>
       <div className="table-inf">
       <strong>Pages:</strong><br/> <span>{book.pages}</span>
       </div>
       </div>

       <div className="descr">
       <strong>Descr:</strong>
       <p>{book.descr}</p>
       </div>

       <MultiButton purchased = {book.purchased} BookId ={book.id} title={book.title}/>

   
   </div>
    </div>;
}

export default BookInf;