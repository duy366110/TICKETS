import { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

const CommentsComponent = (props: any) => {
  const [comments, setComments] = useState([
    {
      userId: "01a",
      comId: "012",
      fullName: "John Doe",
      avatarUrl: "https://ui-avatars.com/api/?name=John+Doe",
      text: "This is a comment.",
      replies: [],
    },
  ]);

  return (
    <div>
      <CommentSection
        currentUser={{
          currentUserId: "01a",
          currentUserImg: "https://ui-avatars.com/api/?name=Current+User",
          currentUserFullName: "Current User",
          currentUserProfile: "",
        }}
        logIn={{
          loginLink: "/login",
          signUpLink: "/signup",
        }}
        advancedInput={true}
        commentData={comments}
        onSubmitAction={(newComment: any) => {
          console.log("New comment:", newComment);
          setComments([...comments, newComment]);
        }}
      />
    </div>
  );
};

export default CommentsComponent;
