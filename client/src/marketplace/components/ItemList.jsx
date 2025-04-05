import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/itemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ItemsView">
      <h3>Marketplace Items</h3>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          className="item-card"
        >
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <p>Price: KES {item.price}</p>
          <p>Posted by: {item.poster}</p>
          {item.image && (
            <img
              src={`http://localhost:5000${item.image}`}
              alt="Product"
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
