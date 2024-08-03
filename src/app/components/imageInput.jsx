"use client";

import Image from "next/image";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Download } from "react-bootstrap-icons";

const ImageInput = ({ onImageUpload, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(imageUrl || null);
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
        onImageUpload(file);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      onImageUpload(files[0]);
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
          <Image
            src={typeof image === "object" ? URL.createObjectURL(image) : image}
            alt="Uploaded"
            className="uploaded-image"
            width={260}
            height={350}
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
