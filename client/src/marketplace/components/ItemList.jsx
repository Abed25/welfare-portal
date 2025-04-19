import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/itemList.css";

const api = import.meta.env.VITE_API_BASE_URL;

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/listings`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className="ItemsView">
      <h3>Marketplace Items</h3>
      {items.map((item) => (
        <div
          key={item._id}
          className="item-card"
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <p>
            <strong>Price:</strong> KES {item.price}
          </p>
          <p>
            <strong>Posted by:</strong> {item.posted_by || "Unknown"}
          </p>
          <p>
            <strong>Email:</strong> {item.email || "Unknown"}
          </p>

          {item.hasImage && (
            <img
              src={`${api}/listings/image/${item._id}`}
              alt="Product"
              style={{ width: "90%", height: "auto", margin: "10px auto" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
