import { useEffect, useState } from "react";
import { getBookList } from "../../utils/request";
import { isAxiosError } from "axios";
import { message } from "antd";
import Book from "./book";

export interface BookType {
  id: number;
  title: string;
  author: string;
  desciprtion: string;
  cover: string;
}

function BookManage() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [search, setSearch] = useState("");

  async function fectchData() {
    try {
      const data = await getBookList(search);
      if (data.status === 201 || data.status === 200) {
        setBooks(data.data);
      }
    } catch (error: unknown) {
      // 原本是any类型，这里做了类型守卫：检查是否是 axios 错误
      if (isAxiosError(error)) {
        message.error(error.response?.data?.message || "查询失败");
      } else if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("未知错误");
      }
    }
  }

  useEffect(() => {
    fectchData();
  }, []);
  return (
    <div className="book-list">
      <header className="book-head">
        <h2>图书管理系统</h2>
        <div>User</div>
      </header>
      <div>
        <span>书籍名称</span>
        <input type="text" />
        <button className="book-btn-search">搜索图书</button>
        <button className="book-btn-add">新增图书</button>
      </div>
      <div>
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}

export default BookManage;
