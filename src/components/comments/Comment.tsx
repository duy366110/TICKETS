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
  const [image, setImage] = useState('');

  const submitHandler = (newComment: any) => {
    const spanElement = document.querySelectorAll('span[data-text]')[0]

    newComment.text = spanElement.innerHTML.toString();
    setComments([...comments, newComment]);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUploadImage = async (file: File) => {
    console.log("Uploaded image:", file);

    const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload/single", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          setImage(data.url);

        } else {
          alert("Upload failed: " + data.message);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading image.");
      }
  };

  useEffect(() => {
    document.querySelectorAll('.rdw-option-wrapper[title="Image"]').forEach((button) => {
      button.addEventListener('click', handleOpenModal);
    });

    return () => {
      document.querySelectorAll('.rdw-option-wrapper[title="Image"]').forEach((button) => {
        button.removeEventListener('click', handleOpenModal);
      });
    };
  }, []);


  useEffect(() => {
    const addImageToContent = () => {
      const spanElement = document.querySelectorAll('span[data-text]')[0];

      if (spanElement && image) {
        spanElement.innerHTML += `
              <div>
                <button class="image" id="1">click</button>
                <img src="${image}" />
              </div>
        `;

        document.querySelectorAll('.image').forEach((button: any) => {
          button.addEventListener("click", (evevnt: any) => {
            evevnt.preventDefault();
            console.log("Hello world");
          })
        })

      }
    };
  
    // Sử dụng setTimeout để đợi DOM render xong (nếu cần thiết)
    const timeoutId = setTimeout(addImageToContent, 100);
    return () => clearTimeout(timeoutId);
  }, [image])

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
