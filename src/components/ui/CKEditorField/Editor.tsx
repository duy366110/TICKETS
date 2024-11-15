import React, { useState } from 'react';
import { useInput } from 'react-admin';
import { Editor } from '@tinymce/tinymce-react';

const CKEditorComponent = ({ source, record = {}, ...props })  => {
  const { input, meta }: any = useInput({ source, record, ...props });
  const [editorValue, setEditorValue] = useState<any>('uuu <img src="https://res.cloudinary.com/doxnf7bp0/image/upload/v1731687043/tickets/lhmncvqlbyix3wabpmry.jpg" alt="Optional Alt Text" width="600" height="400">');

  const handleEditorChange = (content: any) => {
    setEditorValue(content); // Cập nhật giá trị trình soạn thảo
    // input.onChange(content); // Gửi giá trị thay đổi cho react-admin
    console.log(content);
  };

  const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob()); // Thêm ảnh vào formData

    // Gửi yêu cầu upload hình ảnh lên server (ví dụ: API hoặc dịch vụ lưu trữ)
    fetch('http://localhost:8080/upload/single', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Trả về URL của hình ảnh sau khi upload thành công
        // success(data.secure_url); // Trả về URL hình ảnh đã upload

        console.log(data);

        console.log(editorValue);

        success({
          src: 'https://res.cloudinary.com/doxnf7bp0/image/upload/v1731687043/tickets/lhmncvqlbyix3wabpmry.jpg', // URL của ảnh
          alt: "", // Văn bản thay thế (có thể để trống hoặc cung cấp giá trị)
          dimensions: {
            width: "600", // Chiều rộng ảnh (có thể thay đổi tùy theo ảnh đã upload)
            height: "400", // Chiều cao ảnh (có thể thay đổi tùy theo ảnh đã upload)
          },
        });

        
        
        // setEditorValue((content: any) => content.conact('', `<img src="https://res.cloudinary.com/doxnf7bp0/image/upload/v1731687043/tickets/lhmncvqlbyix3wabpmry.jpg" alt="Optional Alt Text" width="600" height="400">`))
       

      })
      .catch((error) => {
        failure('Image upload failed'); // Xử lý lỗi nếu có
      });
  };

  return (
    <div>
      <Editor
        apiKey="vp26o5ws24wgz48jkhvejqrc7iyrotrzc9mdp1519dbm9t8c" // Nếu cần API Key, bạn có thể lấy từ tinymce.com
        value={editorValue}
        init={{
          height: 400,
          menubar: false,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor'],
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
          images_upload_handler: handleImageUpload,
          images_upload_url: 'http://localhost:8080/upload/single',
          file_picker_types: 'image',
        }}
        onEditorChange={handleEditorChange}
      />
      {meta && meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
};

export default CKEditorComponent;
