import React, { useState } from "react";
import PostItem from "../components/PostItem";
import ItemList from "../components/ItemList";
import DynamicButton from "../../counsellors/components/button";
import "../styles/marketplace.css";
export default function MarketPlace() {
  const [post, setPost] = useState(false);
  return (
    <div className="marketPlace">
      <h1 style={{ float: "left" }}>Student Marketplace</h1>
      <h3 style={{ float: "right" }}>
        {post
          ? "Publish a Product of your choice...."
          : " Do you wish to post a Product?"}
        <span>
          <DynamicButton
            name={post ? "Close" : "Post"}
            style={{ margin: "2px 6px" }}
            click={() => setPost(!post)}
          />
        </span>
      </h3>
      {post && <PostItem />}
      <ItemList />
    </div>
  );
}
