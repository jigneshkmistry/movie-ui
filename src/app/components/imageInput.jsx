"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Download } from "react-bootstrap-icons";

const ImageInput = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`image-input-container ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="image-input-box">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="image-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="uploaded-image"
          />
        ) : (
          <div className="image-placeholder">
            <div>
              <Download color="#fff" className="fs-6 pe-auto mb-2 " />
            </div>
            <span className="image-text">
              {isDragging ? "Drop image here" : "Drop an image here"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
