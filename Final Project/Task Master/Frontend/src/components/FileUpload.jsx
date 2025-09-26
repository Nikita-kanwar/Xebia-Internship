import { useRef } from "react";

export default function FileUpload({ onFilesChange }) {
  const fileInputRef = useRef();

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesChange(files);
  };

  return (
    <div className="border-2 border-dashed border-purple-400 rounded-lg p-4 text-center">
      <input type="file" ref={fileInputRef} multiple onChange={handleFilesChange} className="hidden" />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
      >
        📎 Upload Attachments
      </button>
      <p className="text-xs text-gray-500 mt-2">You can upload multiple files</p>
    </div>
  );
}
