import React from "react";

import Requests from "../counsellors/components/request";
import Forum from "../forum/Forum";
import NewPostForm from "../forum/NewPostForm";
import ForumPost from "../forum/ForumPost";

export default function Test() {
  return (
    <div>
      <Forum />
      <ForumPost />
      <NewPostForm />
    </div>
  );
}

{
  /* Receiving all messages body */
}
{
  /* {messages.length > 0 ? (
          messages.map((msg, index) => (
            <pre key={index}>
              📥 Received Data: {JSON.stringify(msg, null, 2)}
            </pre>
          )) */
}
