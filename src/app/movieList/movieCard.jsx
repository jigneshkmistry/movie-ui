import Image from "next/image";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Overlay, Popover } from "react-bootstrap";

const MovieCard = ({ title, year, imageSrc }) => {
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowPopover(!showPopover);
    setTarget(event.currentTarget);
  };

  return (
    <div className="w-100 rounded shadow mb-5 overflow-hidden object-fit-cover">
      {/* ref={ref} */}
      <Image alt="movies" src={imageSrc} width={260} height={350} />
      <div className="p-2">
        <h6>{title || "Movie1"}</h6>
        <span>{year || "2024"}</span>
      </div>

      {/* <Overlay
                show={showPopover}
                target={target}
                placement="right"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-basic">
                    <Popover.Header as="h3">{'Movie1'}</Popover.Header>
                    <Popover.Body>
                        {'No description available'}
                    </Popover.Body>
                </Popover>
            </Overlay> */}
    </div>
  );
};

export default MovieCard;
