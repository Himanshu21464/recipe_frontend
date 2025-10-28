/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const ImageUpload = ({ handleImageChange }) => {
  const [preview, setPreview] = useState(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // creates a temporary URL for preview
      handleImageChange(e); // still call parent handler
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Upload Recipe Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        required
        style={{ marginBottom: 20, display: "block" }}
      />

      {/* Image preview section */}
      {preview && (
        <div style={{ marginTop: 10 }}>
          <h4>Image Preview:</h4>
          <img
            src={preview}
            alt="Recipe Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
