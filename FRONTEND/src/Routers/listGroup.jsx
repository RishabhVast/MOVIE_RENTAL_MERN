import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map((g) => (
        <li
          className={
            g.name === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          key={g._id}
          onClick={() => onItemSelect(g.name)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
