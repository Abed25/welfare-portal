import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Marketplace Items</h2>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>Price: KES {item.price}</p>
          <p>Posted by: {item.poster}</p>
          {item.image && (
            <img
              src={`http://localhost:5000${item.image}`}
              alt=""
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
