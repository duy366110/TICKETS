import { useState, useEffect } from "react";
import { useInput } from "react-admin";
import { Editor } from "@tinymce/tinymce-react";

const EditorField = ({ source, validate = [], record = {}, ...props }: any) => {
  const { field, fieldState, isRequired, id, isTouched, isSubmitted }: any =
    useInput({
      source,
      validate,
      ...props,
    });

  const [editorValue, setEditorValue] = useState<any>(field.value || "");
  const [upload, setUpload] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleEditorChange = (content: any) => {
    setEditorValue(content);
    field.onChange(content);
  };

  const handleValidation = (value: any) => {
    const errorMessages = validate
      .map((rule: any) => rule(value))
      .filter((error: any) => error);

    setErrors(errorMessages);
  };

  const handleImageUpload = async (
    blobInfo: any,
    success: (url: string) => void,
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
      success(data.url);

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

  const handleImageUploadCallback = (cb: any, value: any, meta: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async function () {
      const file = this.files[0];

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload/single", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          cb(data.url, { title: file.name });
        } else {
          alert("Upload failed: " + data.message);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading image.");
      }
    };

    input.click();
  };

  useEffect(() => {
    if (upload) {
      let image = `<image src='${upload.src}' />`;
      setEditorValue((content: any) => content.concat("", image));
      setUpload(null);
    }
  }, [upload]);

  useEffect(() => {
    if (fieldState.invalid && fieldState.error) {
      handleValidation(editorValue);
    }
  }, [fieldState.invalid, fieldState.error]);

  return (
    <div className={`w-full`}>
      <div
        className={`${fieldState.invalid && fieldState.error ? "border-2 border-error rounded-[10px]" : ""}`}
      >
        <Editor
          apiKey="vp26o5ws24wgz48jkhvejqrc7iyrotrzc9mdp1519dbm9t8c" // Nếu cần API Key, bạn có thể lấy từ tinymce.com
          value={editorValue}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "fontsize",
              "fontfamily",
              "textcolor",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "table",
            ],
            toolbar:
              "fontsize | fontfamily | forecolor backcolor | undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table",
            // UPLOAD 2
            images_upload_handler: handleImageUpload,
            images_upload_url: "/api/upload/single",

            // UPLOAD 1
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            file_picker_callback: handleImageUploadCallback,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {errors.length > 0 && (
        <ul className="text-error text-sm ml-[14px]">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditorField;
