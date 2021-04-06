import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Lightbox from "react-image-lightbox";

const SingleLightbox = ({ thumb, className, large, height, open }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {open ? (
        <NavLink to='#' location={{}} onClick={() => setIsOpen(true)}>
          <img
            style={{ height: height ? height : "" }}
            src={thumb}
            alt='thumbnail'
            className={className}
          />
        </NavLink>
      ) : (
        <img
          style={{ height: height ? height : "" }}
          src={thumb}
          alt='thumbnail'
          className={className}
        />
      )}

      {isOpen && (
        <Lightbox mainSrc={large} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
};
export default SingleLightbox;
