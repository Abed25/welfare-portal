const ReplyForm = () => {
  return (
    <form className="reply-form">
      <textarea placeholder="Write a reply..." required></textarea>
      <button type="submit">Reply</button>
    </form>
  );
};
