/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const ImageUpload = ({ handleImageChange }) => (
  <div style={{ marginBottom: 30 }}>
    <h3>Upload Recipe Image</h3>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      required
      style={{ marginBottom: 20, display: "block" }}
    />
  </div>
);

export default ImageUpload;
