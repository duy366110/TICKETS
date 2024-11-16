import { useState, useEffect } from "react";
import { useInput } from "react-admin";
import { Editor } from "@tinymce/tinymce-react";

const EditorField = ({ source, validate, record = {}, ...props }: any) => {
  const { field, fieldState, isRequired, id, isTouched, isSubmitted }: any =
    useInput({
      source,
      validate,
      ...props,
    });

  const [editorValue, setEditorValue] = useState<any>(field.value || "");
  const [upload, setUpload] = useState<any>(null);

  const handleEditorChange = (content: any) => {
    setEditorValue(content);
    field.onChange(content);
  };

  const handleImageUpload = async (
    blobInfo: any,
    success: any,
    failure: any,
  ) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob());

    let res = await fetch("/api/upload/single", {
      method: "POST",
      body: formData,
    });

    let data = await res.json();
    if (data.url) {
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
    if (upload) {
      let image = `<image src='${upload.src}' />`;
      setEditorValue((content: any) => content.concat("", image));
      setUpload(null);
    }
  }, [upload]);

  return (
    <div className={`w-full`}>
      <div className={`${fieldState.invalid && fieldState.error ? "border-2 border-error rounded-[10px]" : ""}`}>
        <Editor
          apiKey="vp26o5ws24wgz48jkhvejqrc7iyrotrzc9mdp1519dbm9t8c" // Nếu cần API Key, bạn có thể lấy từ tinymce.com
          value={editorValue}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "table"
            ],
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table",
            images_upload_handler: handleImageUpload,
            images_upload_url: "/api/upload/single",
            file_picker_types: "image",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {fieldState.invalid && fieldState.error && (
        <span className="text-error text-sm ml-[14px]">{validate(editorValue)}</span>
      )}
    </div>
  );
};

export default EditorField;
