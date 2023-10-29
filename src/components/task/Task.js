import React from "react";

const Task = ({ title, author, pageCount, dateRead }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{pageCount}</p>
      <p>{dateRead}</p>
    </div>
  );
};

export default Task;
