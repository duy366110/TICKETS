import { useState, useEffect } from "react";
import { CommentSection } from "react-comments-section";
import CommentUploadImage from "./sub-comments/CommentUploadImage";
import "react-comments-section/dist/index.css";

const CommentsComponent = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
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

  const submitHandler = (newComment: any) => {
    console.log(newComment);
    setComments([...comments, newComment]);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUploadImage = (file: File) => {
    console.log("Uploaded image:", file);
  };

  useEffect(() => {
    document.querySelectorAll('.rdw-option-wrapper').forEach((button) => {
      button.addEventListener('click', handleOpenModal);
    });

    return () => {
      document.querySelectorAll('.rdw-option-wrapper').forEach((button) => {
        button.removeEventListener('click', handleOpenModal);
      });
    };
  }, []);

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
        onSubmitAction={submitHandler}
        onDeleteAction={(commentId: any) =>
          console.log("Comment deleted:", commentId)
        }
        onReplyAction={(replyData: any) =>
          console.log("Reply submitted:", replyData)
        }
        onEditAction={(editedData: any) =>
          console.log("Comment edited:", editedData)
        }
        customNoComment={() => <div>No comments yet</div>}
        currentData={() => console.log("Fetching current data")}
      />
      <CommentUploadImage open={modalOpen} onClose={handleCloseModal} onUpload={handleUploadImage}/>
    </div>
  );
};

export default CommentsComponent;
