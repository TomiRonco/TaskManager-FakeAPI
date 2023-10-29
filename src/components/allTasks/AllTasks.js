import React from "react";

import Task from "../task/Task";

const books = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    dateRead: "2021-08-12",
    pageCount: 410,
  },
  {
    id: 2,
    title: "Todos los fuegos el fuego",
    author: "Julio Cortazar",
    dateRead: "2020-06-11",
    pageCount: 197,
  },
  {
    id: 3,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    dateRead: "2021-05-09",
    pageCount: 256,
  },
  {
    id: 4,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    dateRead: "2020-03-22",
    pageCount: 352,
  },
];

const AllTasks = () => {
  const tasksMapped = books.map((book) => (
    <Task
      title={book.title}
      author={book.author}
      dateRead={book.dateRead}
      pageCount={book.pageCount}
    />
  ));

  return (
    <div>{tasksMapped.lenght > 0 ? tasksMapped : <h3>No posee tareas</h3>}</div>
  );
};

export default AllTasks;
