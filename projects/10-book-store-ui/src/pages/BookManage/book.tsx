import { type BookType } from "./index";

const Book = ({ book }: { book: BookType }) => {
  return (
    <div className="book">
      <img src={book.cover} alt="book cover image" />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <div className="book-actions">
        <button>详情</button>
        <button>更新</button>
        <button>删除</button>
      </div>
    </div>
  );
};

export default Book;
