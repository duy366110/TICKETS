import * as React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const CommentUploadImage = ({ open, onClose, onUpload }: any) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      onUpload(file);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload Image
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ marginBottom: "10px" }}
          onChange={handleFileChange}
        />
        <br />
        <Button
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose File
        </Button>
      </Box>
    </Modal>
  );
};

export default CommentUploadImage;
