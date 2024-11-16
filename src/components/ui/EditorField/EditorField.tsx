import { useState, useEffect } from 'react';
import { useInput } from 'react-admin';
import { Editor } from '@tinymce/tinymce-react';

const EditorField = ({ source, validate, record = {}, ...props }: any)  => {
  const inputProps = useInput({ source, validate, ...props });
  const [editorValue, setEditorValue] = useState<any>('');
  const [upload, setUpload] = useState<any>(null);

  const handleEditorChange = (content: any) => {
    setEditorValue(content);
  };

  const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob());

    let res = await fetch('http://localhost:8080/upload/single', {
      method: 'POST',
      body: formData
    });
    
    let data = await res.json();
    if(data.url) {
          success({
          src: data.url,
          alt: "",
          dimensions: {
            width: "600",
            height: "400",
          },
        });

        setUpload({
          src: data.url,
          alt: "",
          dimensions: {
            width: "600",
            height: "400",
          },
        });
    }
  };

  useEffect(() => {
    if(upload) {
      let image = `<image src='${upload.src}' />`;
      setEditorValue((content: any) => content.concat('', image));
      setUpload(null);
    }

  }, [upload])

  useEffect(() => {
    if(editorValue) {
      inputProps.field.onChange(editorValue);
    }
  }, [editorValue])

  return (
    <div className="w-full">
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
      {/* {meta && meta.touched && meta.error && <span>{meta.error}</span>} */}
    </div>
  );
};

export default EditorField;
