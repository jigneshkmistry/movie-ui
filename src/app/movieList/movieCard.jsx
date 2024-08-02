import Image from "next/image";
import React from "react";

const MovieCard = ({ title, year, imageSrc }) => {
  return (
    <div className="w-100 rounded shadow mb-5 overflow-hidden object-fit-cover">
      <Image
        alt="movies"
        src={imageSrc}
        layout="responsive"
        width={260}
        height={350}
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
