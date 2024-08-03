import React from "react";

const MovieCard = ({ title, year, imageSrc, onClick }) => {
  return (
    <div
      className="w-100 rounded shadow mb-5 overflow-hidden "
      onClick={onclick}
    >
      <img
        alt="movies"
        src={imageSrc.replace(/^https:/, "http:")}
        // layout="responsive"
        width={260}
        height={300}
        objectFit="cover"
      />
      <div className="p-2">
        <h6>{title}</h6>
        <span>{year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
