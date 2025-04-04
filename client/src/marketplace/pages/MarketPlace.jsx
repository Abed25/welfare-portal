import React from "react";
import PostItem from "../components/PostItem";
import ItemList from "../components/ItemList";
export default function MarketPlace() {
  return (
    <div>
      <h1>Student Marketplace</h1>
      <PostItem />
      <hr />
      <ItemList />
    </div>
  );
}
